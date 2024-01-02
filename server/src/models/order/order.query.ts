import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";

export async function findAllOrderOfRestaurantWithBatch (restaurantId: number) {
    try {
      const order = await Order.findAll({
        where: {
          restaurantId: restaurantId
        },
        include: [{
          model: IngredientBatch
        }]
      });
      return order;
    } catch (error) {
      throw new Error('Error finding order.');
    }
}

export async function addOrderToRestaurantWithIngredientBatches (order: IOrder, ingredientBatches: IIngredientBatch[]) {
  try {
    const newOrder = await Order.create(order);
    ingredientBatches.forEach(async ingredientBatch => {
      ingredientBatch.orderId = newOrder.id;
      ingredientBatch.restaurantId = newOrder.restaurantId;
      ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
      ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
      await IngredientBatch.create(ingredientBatch);
    });
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

