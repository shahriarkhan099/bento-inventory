import { Op } from "sequelize";
import ConsumptionLog from "./consumptionLog.model";
import { IConsumptionLog } from "../../interfaces/consumptionLog.interface";
import { deductDeliveryBoxesFromOrder } from "../deliveryBox/deliveryBox.query";
import { deductIngredientsFromOrder } from "../ingredient/ingredient.query";
import { IngredientToReduce } from "../../interfaces/deductIngredient.interface";
import { DeliveryBoxToReduce } from "../../interfaces/deductDeliveryBox.interface";

export async function findAllConsumptionLogsOfRestaurant(restaurantId: number) {
  try {
    const consumptionLogs = await ConsumptionLog.findAll({
      where: {
        restaurantId: restaurantId,
      }
    });

    return consumptionLogs;
  } catch (error) {
    throw new Error("Error finding consumption logs.");
  }
}

export async function findConsumptionLogsByIngredientName(restaurantId: number, ingredientName: string) {
  try {
    const consumptionLogs = await ConsumptionLog.findAll({
      where: {
        restaurantId: restaurantId,
        itemName: {
          [Op.like]: `%${ingredientName}%`,
        },
      },
    });

    return consumptionLogs;
  } catch (error) {
    throw new Error("Error finding consumption logs.");
  }
}

export async function createConsumptionLogOfRestaurant(consumptionLog: IConsumptionLog, restaurantId: number) {
  try {
    consumptionLog.restaurantId = restaurantId;
    const newConsumptionLog = await ConsumptionLog.create(consumptionLog);
    return newConsumptionLog;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating consumption log.");
  }
}

export async function createConsumptionLogOfRestaurantFromDeduction ( 
  data: { itemName: string, itemType: string, unitOfStock: string, quantity: number,  orderType: string, 
    costPerUnit: number, itemId: number, restaurantId: number }) {
  try {
    const newConsumptionLog = await ConsumptionLog.create({ ...data, consumedAt: new Date() });
    return newConsumptionLog;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating consumption log.");
  }
}

export async function updateConsumptionLog(consumptionLogId: number, consumptionLog: IConsumptionLog) {
  try {
    const updatedConsumptionLog = await ConsumptionLog.update(consumptionLog, {
      where: {
        id: consumptionLogId,
      },
    });
    return updatedConsumptionLog;
  } catch (error) {
    throw new Error("Error updating consumption log.");
  }
}

export async function deleteConsumptionLog(consumptionLogId: number) {
  try {
    const deletedConsumptionLog = await ConsumptionLog.destroy({
      where: {
        id: consumptionLogId,
      },
    });
    return deletedConsumptionLog;
  } catch (error) {
    throw new Error("Error deleting consumption log.");
  }
}

export async function deductIngredientsAndDeliveryBoxesFromOrder (order: {
  orderType: string;
  ingredientsToReduce: IngredientToReduce[];
  deliveryBoxesToReduce: DeliveryBoxToReduce[];
  restaurantId: number;
}) {
  try {
    const { orderType, ingredientsToReduce, deliveryBoxesToReduce, restaurantId } = order;
    const deductedIngredients = await deductIngredientsFromOrder({ingredientsToReduce, orderType, restaurantId});
    const deductedDeliveryBoxes = await deductDeliveryBoxesFromOrder({deliveryBoxesToReduce, orderType, restaurantId});
    return { deductedIngredients, deductedDeliveryBoxes };
  } catch (error) {
    throw new Error('Error deducting ingredients and delivery boxes from order.');
  }
}