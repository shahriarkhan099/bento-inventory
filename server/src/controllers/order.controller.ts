import { Request, Response } from "express";
import { findAllOrderOfRestaurantWithBatch, updateOrderOfRestaurant, 
         addOrderToRestaurantWithIngredientBatches, deleteOrderOfRestaurant } from "../models/order/order.query";


         
export async function getAllOrderOfRestaurantWithBatch (req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId);
        if (restaurantId) {
        const order = await findAllOrderOfRestaurantWithBatch(restaurantId);
        res.status(200).json({ orders: order });
        } else res.status(400).json({ message: "Invalid restaurant ID." });
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
      if (typeof order.restaurantId === 'number') {
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

export async function createOrderToRestaurantWithIngredientBatches (req: Request, res: Response) {
  try {
    const order = req.body;
    const ingredientBatches = req.body.ingredientBatches;
    const deliveryBoxBatches = req.body.deliveryBoxBatches;
    const restaurantId = Number(req.params.restaurantId);
    order.restaurantId = restaurantId;
    if (typeof order.restaurantId === 'number') {
      const newOrder = await addOrderToRestaurantWithIngredientBatches(order, ingredientBatches, deliveryBoxBatches);
      res.status(201).json(newOrder);
    } else res.status(400).json({ message: "Invalid order information." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}