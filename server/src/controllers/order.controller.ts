import { Request, Response } from "express";
import { findAllOrderOfRestaurant, addOrderToRestaurant, updateOrderOfRestaurant, deleteOrderOfRestaurant } from "../models/order/order.query";

export async function getAllOrderOfRestaurant (req: Request, res: Response) {
    try {
      const orders = await findAllOrderOfRestaurant(parseInt(req.params.restaurantId));
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
}

export async function createOrderToRestaurant (req: Request, res: Response) {
    try {
      const order = req.body;
      if (typeof order.totalPrice === 'number' && typeof order.status === 'string' && typeof order.orderDate === 'string' && typeof order.deliveryDate === 'string' && typeof order.restaurantId === 'number') {
        const newOrder = await addOrderToRestaurant(order);
        res.status(201).json(newOrder);
      } else res.status(400).json({ message: "Invalid order information." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}
 
export async function editOrderOfRestaurant (req: Request, res: Response) {
  try {
    const orderId = Number(req.params.orderId);
    if (orderId) {
      let order = req.body;
      if (typeof order.totalPrice === 'number' && typeof order.status === 'string' && typeof order.orderDate === 'string' && typeof order.deliveryDate === 'string' && typeof order.restaurantId === 'number') {
        const updatedOrder = await updateOrderOfRestaurant(orderId, order);
        res.status(200).json(updatedOrder);
      } else res.status(400).json({ message: "Invalid order information." });
    } else res.status(400).json({ message: "Invalid order ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function removeOrderOfRestaurant (req: Request, res: Response) {
    try {
        const orderId = Number(req.params.orderId);
        if (orderId) {
        const deletedOrder = await deleteOrderOfRestaurant(orderId);
        res.status(200).json(deletedOrder);
        } else res.status(400).json({ message: "Invalid order ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}