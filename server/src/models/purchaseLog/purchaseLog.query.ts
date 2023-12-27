import { Op } from "sequelize";
import PurchaseLog from "./purchaseLog.model";
import { IPurchaseLog } from "../../interfaces/purchaseLog.interface";
import Supplier from "../supplier/supplier.model";
import Ingredient from "../ingredient/ingredient.model";

export async function findAllPurchaseLogsOfRestaurant (restaurantId: number) {
  try {
    const purchaseLogs = await PurchaseLog.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    return purchaseLogs;
  } catch (error) {
    throw new Error('Error finding purchase logs.');
  }
}

export async function createPurchaseLogOfRestaurant (purchaseLog: IPurchaseLog, restaurantId: number) {
    try {
        purchaseLog.restaurantId = restaurantId;
        const newPurchaseLog = await PurchaseLog.create(purchaseLog); 
        return newPurchaseLog;
    } catch (error) {
        throw new Error('Error creating purchase log.');
    }
}

export async function updatePurchaseLog (purchaseLogId: number, purchaseLog: IPurchaseLog) {
  try {
    const updatedPurchaseLog = await PurchaseLog.update(purchaseLog, {
      where: {
        id: purchaseLogId
      }
    });
    return updatedPurchaseLog;
  } catch (error) {
    throw new Error('Error updating purchase log.');
  }
}

export async function deletePurchaseLog (purchaseLogId: number) {
  try {
    const deletedPurchaseLog = await PurchaseLog.destroy({
      where: {
        id: purchaseLogId
      }
    });
    return deletedPurchaseLog;
  } catch (error) {
    throw new Error('Error deleting purchase log.');
  }
}

export async function findPurchaseLogsWithSupplierAndIngredient (restaurantId: number) {
  try {
    const purchaseLogs = await PurchaseLog.findAll({
      where: {
        restaurantId: restaurantId
      },
      include: [Supplier, Ingredient]
    });
    return purchaseLogs;
  } catch (error) {
    throw new Error('Error finding purchase log.');
  }
}

export async function findPurchaseLogsWithSupplierBySupplierName (restaurantId: number, supplierId: number) {
  try {
    const purchaseLogs = await PurchaseLog.findAll({
      where: {
        restaurantId: restaurantId,
        supplierId: supplierId
      },
      include: [Supplier]
    });
    return purchaseLogs;
  } catch (error) {
    throw new Error('Error finding purchase log.');
  }
}

export async function searchPurchaseLogsWithSupplierBySupplierName (restaurantId: number, supplierName: string) {
  try {
    const purchaseLogs = await PurchaseLog.findAll({
      where: {
        restaurantId: restaurantId
      },
      include: [{
        model: Supplier,
        where: {
          name: {
            [Op.like]: `%${supplierName}%`
          }
        }
      }]
    });
    return purchaseLogs;
  } catch (error) {
    throw new Error('Error finding purchase log.');
  }
}