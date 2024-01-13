import { Request, Response } from "express";
import { findAllDeliveryBoxOfRestaurant, addDeliveryBoxToRestaurant, updateDeliveryBoxOfRestaurant, deductDeliveryBoxInFIFO, 
    deleteDeliveryBoxById, findDeliveryBoxBySearchTerm } from "../models/deliveryBoxBatch/deliveryBoxBatch.query";

export async function getAllDeliveryBoxOfRestaurant (req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId);
        if (restaurantId) {
        const deliveryBox = await findAllDeliveryBoxOfRestaurant(restaurantId);
        res.status(200).json({ deliveryBoxes: deliveryBox });
        } else res.status(400).json({ message: "Invalid restaurant ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function addDeliveryBoxToRestaurantWithBatch (req: Request, res: Response) {
    try {
        const deliveryBox = req.body;
        const restaurantId = Number(req.params.restaurantId);
        deliveryBox.restaurantId = restaurantId;
        if (typeof deliveryBox.restaurantId === 'number') {
        const newDeliveryBox = await addDeliveryBoxToRestaurant(deliveryBox);
        res.status(201).json(newDeliveryBox);
        } else res.status(400).json({ message: "Invalid delivery box information." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function updateDeliveryBox (req: Request, res: Response) {
    try {
        const deliveryBoxId = Number(req.params.deliveryBoxId);
        if (deliveryBoxId) {
        let deliveryBox = req.body;
        if (typeof deliveryBoxId === 'number') {
            const updatedDeliveryBox = await updateDeliveryBoxOfRestaurant(deliveryBoxId, deliveryBox);
            res.status(200).json(updatedDeliveryBox);
        } else res.status(400).json({ message: "Invalid delivery box information." });
        } else res.status(400).json({ message: "Invalid delivery box ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function deleteDeliveryBox (req: Request, res: Response) {
    try {
        const deliveryBoxId = Number(req.params.deliveryBoxId);
        if (deliveryBoxId) {
        const deletedDeliveryBox = await deleteDeliveryBoxById(deliveryBoxId);
        res.status(200).json(deletedDeliveryBox);
        } else res.status(400).json({ message: "Invalid delivery box ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function searchDeliveryBox (req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.restaurantId);
        const searchTerm = req.params.searchTerm;
        if (restaurantId) {
        const deliveryBox = await findDeliveryBoxBySearchTerm(restaurantId, searchTerm);
        res.json({ deliveryBoxes: deliveryBox });
        } else res.status(400).json({ message: "Invalid restaurant ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}