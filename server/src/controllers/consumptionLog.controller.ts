import { Request, Response } from "express";
import {
  findAllConsumptionLogsOfRestaurant,
  findConsumptionLogsByIngredientName,
  createConsumptionLogOfRestaurant,
  updateConsumptionLog,
  deleteConsumptionLog,
  deductIngredientsAndDeliveryBoxesFromOrder
} from "../models/consumptionLog/consumptionLog.query";
import { IngredientToReduce } from "../interfaces/deductIngredient.interface";
import { deductIngredientsFromOrder } from "../models/ingredient/ingredient.query";
import { DeliveryBoxToReduce } from "../interfaces/deductDeliveryBox.interface";
import { deductDeliveryBoxesFromOrder } from "../models/deliveryBox/deliveryBox.query";


export async function getAllConsumptionLogsOfRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const consumptionLogs = await findAllConsumptionLogsOfRestaurant(
        restaurantId
      );
      res.json({ consumptionLogs: consumptionLogs });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchConsumptionLogs(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);

    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const consumptionLogs = await findConsumptionLogsByIngredientName(
        restaurantId,
        searchTerm
      );
      res.json({ consumptionLogs: consumptionLogs });
    } else res.json({ consumptionLogs: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postConsumptionLogToRestaurant(
  req: Request,
  res: Response
) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let consumptionLog = req.body;
      if (typeof consumptionLog.ingredientName === "string") {
        const newConsumptionLog = await createConsumptionLogOfRestaurant(
          consumptionLog,
          restaurantId
        );
        res.status(201).json("Created");
      } else {
        res
          .status(400)
          .json({ message: "Invalid consumption log information." });
      }
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function putConsumptionLog(req: Request, res: Response) {
  try {
    const consumptionLogId = Number(req.params.consumptionLogId);
    if (consumptionLogId) {
      let consumptionLog = req.body;
      if (typeof consumptionLog.ingredientName === "string") {
        const updatedConsumptionLog = await updateConsumptionLog(
          consumptionLogId,
          consumptionLog
        );
        res.json("Updated");
      } else {
        res
          .status(400)
          .json({ message: "Invalid consumption log information." });
      }
    } else res.status(400).json({ message: "Invalid consumption log ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteConsumptionLogOfRestaurant(req: Request, res: Response) {
  try {
    const consumptionLogId = Number(req.params.consumptionLogId);
    if (consumptionLogId) {
      const deletedConsumptionLog = await deleteConsumptionLog(
        consumptionLogId
      );
      res.json("Deleted");
    } else res.status(400).json({ message: "Invalid consumption log ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postConsumptionLogToRestaurantWithOrder (req: Request, res: Response) {
  try {
    const { orderType, restaurantId, ingredientsToReduce, deliveryBoxesToReduce } = req.body;
    console.log('data that has come from skeleton/kds to minus from inventory', req.body);
    

    const orderWithIngredients = { orderType: orderType, restaurantId: restaurantId, ingredientsToReduce: ingredientsToReduce as IngredientToReduce[]};
    const orderWithDeliveryBoxes = { orderType: orderType, restaurantId: restaurantId, deliveryBoxesToReduce: deliveryBoxesToReduce as DeliveryBoxToReduce[]};


    await deductIngredientsFromOrder(orderWithIngredients);
    if (orderWithDeliveryBoxes.deliveryBoxesToReduce.length !== 0) {
      await deductDeliveryBoxesFromOrder(orderWithDeliveryBoxes);
    }

    res.status(200).json({message: "Deducted"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}