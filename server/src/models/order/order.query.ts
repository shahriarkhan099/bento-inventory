import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";
import { updateIngredientInfoOfRestaurantWithNewIngredientBatch } from "../ingredient/ingredient.query";
import { updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch } from "../deliveryBox/deliveryBox.query";
import { addIngredientToRestaurant } from "../ingredientBatch/ingredientBatch.query";
import DeliveryBoxBatch from "../deliveryBoxBatch/deliveryBoxBatch.model";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";
import { addDeliveryBoxToRestaurant } from "../deliveryBoxBatch/deliveryBoxBatch.query";
import axios from 'axios';

export async function findAllOrderOfRestaurantWithBatch (restaurantId: number) {
    try {
      const order = await Order.findAll({
        where: {
          restaurantId: restaurantId
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
      throw new Error('Error finding order.');
    }
}

export async function findAllOrderOfRestaurantWithPendingBatch (restaurantId: number) {
  try {
    const order = await Order.findAll({
      where: {
        restaurantId: restaurantId,
        status: {
          [Op.or]: ['pending', 'preparing', 'out_for_delivery', 'cancelled']
        }
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
    throw new Error('Error finding order.');
  }
}

export async function addOrderToRestaurant (order: IOrder) {
    try {
      const newOrder = await Order.create(order);
      return newOrder;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating order.');
    }
}

export async function updateOrderOfRestaurant (orderId: number, order: IOrder) {
  try {
    const updatedOrder = await Order.update(order, {
      where: {
        id: orderId
      }
    });
    return updatedOrder;
  } catch (error) {
    throw new Error('Error updating order.');
  }
}

export async function deleteOrderOfRestaurant (orderId: number) {
  try {
    const deletedOrder = await Order.destroy({
      where: {
        id: orderId
      }
    });
    return deletedOrder;
  } catch (error) {
    throw new Error('Error deleting order.');
  }
}

export async function addOrderToRestaurantWithIngredientBatches (order: IOrder, ingredientBatches: IIngredientBatch[], deliveryBoxBatches: IDeliveryBoxBatch[]) {
  setTimeout(async () => {
    try {
      order.totalPrice = 0;

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
        ingredientBatches.forEach(async (ingredientBatch) => {
          ingredientBatch.orderId = newOrder.id;
          ingredientBatch.restaurantId = newOrder.restaurantId;
          ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
          ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
          const newIngredientBatch = await addIngredientToRestaurant(ingredientBatch);
          await updateIngredientInfoOfRestaurantWithNewIngredientBatch(newIngredientBatch);
        });
      }

      if (deliveryBoxBatches) {
        deliveryBoxBatches.forEach(async (deliveryBoxBatch) => {
          deliveryBoxBatch.orderId = newOrder.id;
          deliveryBoxBatch.restaurantId = newOrder.restaurantId;
          deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
          deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
          const newDeliveryBoxBatch = await addDeliveryBoxToRestaurant(deliveryBoxBatch);
          await updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(newDeliveryBoxBatch);
        });
      }

      return newOrder;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating order with Batches.');
    }
  }, 20000); // 20 seconds delay
}

export async function addOrderToRestaurantWithIngredientBatchesAfterSixHours (order: IOrder, ingredientBatches: IIngredientBatch[], deliveryBoxBatches: IDeliveryBoxBatch[]) {
  setTimeout(async () => {
    try {
      order.totalPrice = 0;

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
        ingredientBatches.forEach(async (ingredientBatch) => {
          ingredientBatch.orderId = newOrder.id;
          ingredientBatch.restaurantId = newOrder.restaurantId;
          ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
          ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
          const newIngredientBatch = await addIngredientToRestaurant(ingredientBatch);
          await updateIngredientInfoOfRestaurantWithNewIngredientBatch(newIngredientBatch);
        });
      }

      if (deliveryBoxBatches) {
        deliveryBoxBatches.forEach(async (deliveryBoxBatch) => {
          deliveryBoxBatch.orderId = newOrder.id;
          deliveryBoxBatch.restaurantId = newOrder.restaurantId;
          deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
          deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
          const newDeliveryBoxBatch = await addDeliveryBoxToRestaurant(deliveryBoxBatch);
          await updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(newDeliveryBoxBatch);
        });
      }

      return newOrder;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating order with Batches.');
    }
  }, 6 * 60 * 60 * 1000); 
}

export async function addOrderToRestaurantWithIngredientBatchesAfterFiveHours (order: IOrder, ingredientBatches: IIngredientBatch[], deliveryBoxBatches: IDeliveryBoxBatch[]) {
  setTimeout(async () => {
    try {
      order.totalPrice = 0;

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

      // Send request to another API
      const response = await axios.post('https://example.com/api', order);
      
      if (response.status === 200) {
        const newOrder = await addOrderToRestaurant(order);

        if (ingredientBatches) {
          ingredientBatches.forEach(async (ingredientBatch) => {
            ingredientBatch.orderId = newOrder.id;
            ingredientBatch.restaurantId = newOrder.restaurantId;
            ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
            ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
            const newIngredientBatch = await addIngredientToRestaurant(ingredientBatch);
            await updateIngredientInfoOfRestaurantWithNewIngredientBatch(newIngredientBatch);
          });
        }

        if (deliveryBoxBatches) {
          deliveryBoxBatches.forEach(async (deliveryBoxBatch) => {
            deliveryBoxBatch.orderId = newOrder.id;
            deliveryBoxBatch.restaurantId = newOrder.restaurantId;
            deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
            deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
            const newDeliveryBoxBatch = await addDeliveryBoxToRestaurant(deliveryBoxBatch);
            await updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(newDeliveryBoxBatch);
          });
        }

        return newOrder;
      } else {
        throw new Error('Error creating order with Batches.');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error creating order with Batches.');
    }
  }, 5 * 60 * 60 * 1000); 
}