import { Op } from "sequelize";
import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";

export async function findAllOrderOfRestaurant (restaurantId: number) {
    try {
      const order = await Order.findAll({
        where: {
          restaurantId: restaurantId
        }
      });
  
      return order;
    } catch (error) {
      throw new Error('Error finding orders.');
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