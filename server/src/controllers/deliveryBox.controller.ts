import { Request, Response } from "express";
import {
  findAllDeliveryBoxesOfRestaurant,
  findDeliveryBoxesByBoxName,
  createDeliveryBoxOfRestaurant,
  updateDeliveryBox,
  deleteDeliveryBox,
} from "../models/deliveryBox/deliveryBox.query";



export async function getAllDeliveryBoxesOfRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const deliveryBoxes = await findAllDeliveryBoxesOfRestaurant(
        restaurantId
      );
      res.json({ deliveryBoxes: deliveryBoxes });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchDeliveryBoxes(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);

    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const deliveryBoxes = await findDeliveryBoxesByBoxName(
        restaurantId,
        searchTerm
      );
      res.json({ deliveryBoxes: deliveryBoxes });
    } else res.json({ deliveryBoxes: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postDeliveryBoxToRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let deliveryBox = req.body;
      if (typeof deliveryBox.boxName === "string") {
        const newDeliveryBox = await createDeliveryBoxOfRestaurant(
          deliveryBox,
          restaurantId
        );
        res.status(201).json("Created");
      } else {
        res.status(400).json({ message: "Invalid delivery box information." });
      }
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function putDeliveryBox(req: Request, res: Response) {
  try {
    const deliveryBoxId = Number(req.params.deliveryBoxId);
    if (deliveryBoxId) {
      let deliveryBox = req.body;
      if (typeof deliveryBox.boxName === "string") {
        const updatedDeliveryBox = await updateDeliveryBox(
          deliveryBoxId,
          deliveryBox
        );
        res.status(200).json("Updated");
      } else {
        res.status(400).json({ message: "Invalid delivery box information." });
      }
    } else res.status(400).json({ message: "Invalid delivery box ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteDeliveryBoxOfRestaurant(req: Request, res: Response) {
  try {
    const deliveryBoxId = Number(req.params.deliveryBoxId);
    if (deliveryBoxId) {
      const deletedDeliveryBox = await deleteDeliveryBox(deliveryBoxId);
      res.status(200).json("Deleted");
    } else res.status(400).json({ message: "Invalid delivery box ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
