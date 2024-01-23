import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";
import { updateIngredientInfoOfRestaurantWithNewIngredientBatch, findOneIngredientOfRestaurantWithUniqueIngredientId } from "../ingredient/ingredient.query";
import { updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch } from "../deliveryBox/deliveryBox.query";
import { addIngredientToRestaurant } from "../ingredientBatch/ingredientBatch.query";
import DeliveryBoxBatch from "../deliveryBoxBatch/deliveryBoxBatch.model";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";
import { addDeliveryBoxToRestaurant } from "../deliveryBoxBatch/deliveryBoxBatch.query";
import Supplier from "../supplier/supplier.model";
import axios from 'axios';
import { addSupplier } from "../supplier/supplier.query";

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

// create vendor if not exists
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
      const ingredient = await findOneIngredientOfRestaurantWithUniqueIngredientId(ingredientBatch.uniqueIngredientId, newOrder.restaurantId);
  
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
    
        const newIngredientBatch = await addIngredientToRestaurant(ingredientBatch);
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
    const vendor = await axios.get(`http://localhost:5000/v1/vendor/${order.supplierId}`);
        
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

export async function checkSupplierHasProduct(supplierId: number, uniqueIngredientId: number) {
  try {
    const vendor = await axios.get(`http://localhost:5000/v1/vendor/${supplierId}`);
    const products = await axios.get(`http://localhost:5000/v1/product/vendor/${supplierId}`);
    const currentDayOfWeek = new Date().getDay();
    console.log(products.data.data);
    for (const product of products.data.data) {
      if (product.uniqueIngredientId === uniqueIngredientId) {
        return true;
      }
    }
    return false;
  }
  catch (error) {
    console.log(error);
    throw new Error("Error checking supplier has product.");
  }
}

