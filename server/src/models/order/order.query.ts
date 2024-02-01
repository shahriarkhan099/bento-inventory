import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";
import { updateIngredientInfoOfRestaurantWithNewIngredientBatch, findOneIngredientOfRestaurantWithUniqueIngredientId, findOneIngredientWithUniqueIngredientId, addIngredientToRestaurant } from "../ingredient/ingredient.query";
import { updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch } from "../deliveryBox/deliveryBox.query";
import { addIngredientBatchToRestaurant } from "../ingredientBatch/ingredientBatch.query";
import DeliveryBoxBatch from "../deliveryBoxBatch/deliveryBoxBatch.model";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";
import { addDeliveryBoxToRestaurant } from "../deliveryBoxBatch/deliveryBoxBatch.query";
import Supplier from "../supplier/supplier.model";
import axios from 'axios';
import { addSupplier, findAllSuppliers } from "../supplier/supplier.query";
import config from "../../config";

export async function findAllOrderOfRestaurantWithBatch(restaurantId: number) {
  try {
    const order = await Order.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: IngredientBatch,
        },
        {
          model: DeliveryBoxBatch,
        },
        {
          model: Supplier,
        }
      ],
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding order.");
  }
}

export async function findAllOrderOfRestaurantWithPendingBatch(
  restaurantId: number
) {
  try {
    const order = await Order.findAll({
      where: {
        restaurantId: restaurantId,
        status: {
          [Op.or]: ["pending", "preparing", "out_for_delivery", "cancelled"],
        },
      },
      include: [
        {
          model: IngredientBatch,
        },
        {
          model: DeliveryBoxBatch,
        },
      ],
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding order.");
  }
}

export async function addOrderToRestaurant(order: IOrder) {
  try {
    console.log("Order that I'm receiving", order);
    
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating order.");
  }
}

export async function updateOrderOfRestaurant(orderId: number, order: IOrder) {
  try {
    const updatedOrder = await Order.update(order, {
      where: {
        id: orderId,
      },
    });
    return updatedOrder;
  } catch (error) {
    throw new Error("Error updating order.");
  }
}

export async function deleteOrderOfRestaurant(orderId: number) {
  try {
    const deletedOrder = await Order.destroy({
      where: {
        id: orderId,
      },
    });
    return deletedOrder;
  } catch (error) {
    throw new Error("Error deleting order.");
  }
}

export async function addOrderToRestaurantWithIngredientBatches(order: IOrder, ingredientBatches: IIngredientBatch[]) {
  try {
    order.totalPrice = 0;
    order.status = "delivered";

    if (ingredientBatches) {
      ingredientBatches.forEach(async (ingredientBatch) => {
        order.totalPrice += ingredientBatch.purchasePrice;
      });
    }

    // create vendor if not exists
    if (order.supplierId) {
      const supplier = await Supplier.findOne({
        where: {
          vendorId: order.supplierId,
        },
      });

      if (!supplier) {
        const newSupplier = await addSupplierIfNoExists(order);
        order.supplierId = newSupplier!.id as number; 
      } else {
        order.supplierId = supplier.id as number;
      }
    }

    const newOrder = await addOrderToRestaurant(order);

    if (ingredientBatches) {
      await processIngredientBatches(ingredientBatches, newOrder);
    }

    return newOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating order with Ingredient Batches.");
  }
}

// create vendor if not exists
export async function addOrderToRestaurantWithDeliveryBoxBatches(order: IOrder, deliveryBoxBatches: IDeliveryBoxBatch[]) {
  try {
    order.totalPrice = 0;
    order.status = "delivered";

    if (deliveryBoxBatches) {
      deliveryBoxBatches.forEach(async (deliveryBoxBatch) => {
        order.totalPrice += deliveryBoxBatch.purchasePrice;
      });
    }

    const newOrder = await addOrderToRestaurant(order);

    if (deliveryBoxBatches) {
      await processDeliveryBoxBatches(deliveryBoxBatches, newOrder);
    }

    return newOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating order with Delivery Box Batches.");
  }
}

async function processIngredientBatches(ingredientBatches: IIngredientBatch[], newOrder: IOrder) {
  try {
    for (const ingredientBatch of ingredientBatches) {
      let ingredient = await findOneIngredientOfRestaurantWithUniqueIngredientId(ingredientBatch.uniqueIngredientId, newOrder.restaurantId);

      if (!ingredient) {
        const similarIngredient = await findOneIngredientWithUniqueIngredientId(ingredientBatch.uniqueIngredientId);
        
        if (similarIngredient) {
          let newIngredient = {
            uniqueIngredientId: ingredientBatch.uniqueIngredientId,
            ingredientName: similarIngredient.ingredientName,
            unitOfStock: similarIngredient.unitOfStock,
            unitOfPrice: similarIngredient.unitOfPrice,
            caloriesPerUnit: similarIngredient.caloriesPerUnit,
            reorderPoint: similarIngredient.reorderPoint,
            liquid: similarIngredient.liquid,
            perishable: similarIngredient.perishable,
            description: similarIngredient.description,
            unitOfIdealStoringTemperature: similarIngredient.unitOfIdealStoringTemperature,
            idealStoringTemperature: similarIngredient.idealStoringTemperature,
            categoryId: similarIngredient.categoryId,

            currentStockQuantity: 0,
            costPerUnit: 0,
            restaurantId: newOrder.restaurantId,
            expectedStockForToday: 0,
            expectedStockForTomorrow: 0,
          }
          ingredient = await addIngredientToRestaurant(newIngredient);
        }
      }
  
      if (ingredient) {
        if (ingredientBatch.unitOfStock === "kg" || ingredientBatch.unitOfStock === "litre") {
          ingredientBatch.purchaseQuantity *= 1000;
        }
        if (ingredientBatch.unitOfStock === "litre") {
          ingredientBatch.unitOfStock = "ml";
        } else if (ingredientBatch.unitOfStock === "kg") {
          ingredientBatch.unitOfStock = "gm";
        }
        ingredientBatch.purchasePrice *= 100;

        ingredientBatch.ingredientId = ingredient.id;
        ingredientBatch.orderId = newOrder.id;
        ingredientBatch.restaurantId = newOrder.restaurantId;
        ingredientBatch.supplierId = newOrder.supplierId;
        ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
        ingredientBatch.costPerUnit = Number(ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity);
    
        const newIngredientBatch = await addIngredientBatchToRestaurant(ingredientBatch);
        await updateIngredientInfoOfRestaurantWithNewIngredientBatch(newIngredientBatch);
      } 
      else {
        console.log("Error finding Ingredient With UniqueIngredientId.");
      }
    }
  } catch(error) {
    console.log(error);
    throw new Error("Error adding Ingredient To add ingredient Batches.");
  }
}

async function processDeliveryBoxBatches(deliveryBoxBatches: IDeliveryBoxBatch[], newOrder: IOrder) {
  for (const deliveryBoxBatch of deliveryBoxBatches) {
    deliveryBoxBatch.orderId = newOrder.id;
    deliveryBoxBatch.restaurantId = newOrder.restaurantId;
    deliveryBoxBatch.supplierId = newOrder.supplierId;
    deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
    deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;

    const newDeliveryBoxBatch = await addDeliveryBoxToRestaurant(deliveryBoxBatch);
    await updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(newDeliveryBoxBatch);
  }
}

export async function addOrderToRestaurantWithAllBatches(order: IOrder, ingredientBatches: IIngredientBatch[], deliveryBoxBatches: IDeliveryBoxBatch[]) {
  try {
    order.totalPrice = 0;
    order.status = "delivered";

    if (ingredientBatches) {
      ingredientBatches.forEach(async (ingredientBatch) => {
        order.totalPrice += ingredientBatch.purchasePrice;
      });
    }

    if (deliveryBoxBatches) {
      deliveryBoxBatches.forEach(async (deliveryBoxBatch) => {
        order.totalPrice += deliveryBoxBatch.purchasePrice;
      });
    }

    const newOrder = await addOrderToRestaurant(order);

    if (ingredientBatches) {
      await processIngredientBatches(ingredientBatches, newOrder);
    }

    if (deliveryBoxBatches) {
      await processDeliveryBoxBatches(deliveryBoxBatches, newOrder);
    }

    return newOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating order with Batches.");
  }
}

export async function addSupplierIfNoExists(order: IOrder) {
  try {
    const vendor = await axios.get(`${config.HELPER_API}/v1/vendor/${order.supplierId}`);
        
    if (vendor.data) {
      console.log({...vendor.data.data});
      const newSupplier = {
        vendorId: vendor.data.data.id,
        name: vendor.data.data.name,
        address: vendor.data.data.address,
        contactNumber: vendor.data.data.contactNumber,
        email: vendor.data.data.email,
        label: 'New',
        restaurantId: order.restaurantId,
      }
      console.log("newSupplier", newSupplier);
      const supplier = await addSupplier(newSupplier);
      return supplier;
    }

  } catch (error) {
    console.log(error);
    throw new Error("Error adding supplier.");
  }
}

export async function sendAutoPilotOrderToVendor (vendorId: number, order: any) {
  try {
    const vendor = await axios.post(`${config.HELPER_API}/v1/vendor/${vendorId}/order`, order);
    return vendor;
  }
  catch (error) {
    console.log(error);
    throw new Error("Error sending auto pilot order to vendor.");
  }
}
