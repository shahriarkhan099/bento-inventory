import { Request, Response } from "express";
import { findAllPurchaseLogsOfRestaurant, createPurchaseLogOfRestaurant, updatePurchaseLog, deletePurchaseLog, findPurchaseLogsWithSupplierAndIngredient, 
         searchPurchaseLogsWithSupplierBySupplierName } from "../models/purchaseLog/purchaseLog.query";


export async function getAllPurchaseLogsOfRestaurant (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      if (restaurantId) {
        const purchaseLogs = await findAllPurchaseLogsOfRestaurant(restaurantId);
        res.json({ purchaseLogs: purchaseLogs });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function postPurchaseLogToRestaurant (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let purchaseLog = req.body;
      if (typeof purchaseLog.ingredientName === 'string') {
        const newPurchaseLog = await createPurchaseLogOfRestaurant(purchaseLog, restaurantId);
        res.status(201).json("Created");
      } else {
        res.status(400).json({ message: "Invalid purchase log information." });
      }
  } else res.status(400).json({ message: "Invalid restaurant ID." });
    
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function putPurchaseLog (req: Request, res: Response) {
    try {
      const purchaseLogId = Number(req.params.purchaseLogId);
      if (purchaseLogId) {
        let purchaseLog = req.body;
        if (typeof purchaseLog.ingredientName === 'string') {
          const updatedPurchaseLog = await updatePurchaseLog(purchaseLogId, purchaseLog);
          res.status(200).json("Updated");
        } else {
          res.status(400).json({ message: "Invalid purchase log information." });
        }
      } else res.status(400).json({ message: "Invalid purchase log ID." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function deletePurchaseLogById (req: Request, res: Response) {
    try {
      const purchaseLogId = Number(req.params.purchaseLogId);
      if (purchaseLogId) {
        const deletedPurchaseLog = await deletePurchaseLog(purchaseLogId);
        res.status(200).json("Deleted");
      } else res.status(400).json({ message: "Invalid purchase log ID." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function getPurchaseLogsWithSupplierAndIngredient (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      if (restaurantId) {
        const purchaseLogs = await findPurchaseLogsWithSupplierAndIngredient(restaurantId);
        res.json({ purchaseLogs: purchaseLogs });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function searchPurchaseLogsWithSupplier (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      
      const search = req.query.q;
      const searchTerm = search?.toString();
  
      if (searchTerm) {
        const purchaseLogs = await searchPurchaseLogsWithSupplierBySupplierName(restaurantId, searchTerm);
        res.json({ purchaseLogs: purchaseLogs });
      } else res.json({ purchaseLogs: [] });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

