import { Request, Response } from "express";
import {
  findAllWasteLogWithIngredient,
  addWasteLog,
  updateWasteLog,
  findWasteLogBySearchTerm,
  deleteWasteLog,
  getSevenMostWastedIngredients,
} from "../models/wasteLog/wasteLog.query";

export async function getAllWasteLogWithIngredient (req: Request, res: Response) {
    try {
      const wasteLog = await findAllWasteLogWithIngredient(parseInt(req.params.restaurantId));
      res.status(200).json({ wasteLogs: wasteLog });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function createWasteLog (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      const wasteLog = req.body;
      if (typeof wasteLog.ingredientId === 'number') {
        const newWasteLog = await addWasteLog(wasteLog, restaurantId);
        res.status(201).json({ wasteLog: wasteLog });
      } else res.status(400).json({ message: "Invalid waste log information." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function editWasteLog (req: Request, res: Response) {
  try {
    const wasteLogId = Number(req.params.wasteLogId);
    if (wasteLogId) {
      let wasteLog = req.body;
      if (typeof wasteLog.restaurantId === 'number') {
        const updatedWasteLog = await updateWasteLog(wasteLogId, wasteLog);
        res.status(200).json(updatedWasteLog);
      } else res.status(400).json({ message: "Invalid waste log information." });
    } else res.status(400).json({ message: "Invalid waste log ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchWasteLog (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    
    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const wasteLog = await findWasteLogBySearchTerm(restaurantId, searchTerm);
      res.json({ wasteLogs: wasteLog });
    } else res.json({ wasteLogs: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function removeWasteLog(req: Request, res: Response) {
  try {
    const wasteLogId = Number(req.params.wasteLogId);
    if (wasteLogId) {
      await deleteWasteLog(wasteLogId);
      res.status(200).json({ message: "Waste log deleted." });
    } else res.status(400).json({ message: "Invalid waste log ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getSevenMostWastedIngredientsForRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const sevenMostWastedIngredients = await getSevenMostWastedIngredients(restaurantId);
    res.status(200).json(sevenMostWastedIngredients);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}