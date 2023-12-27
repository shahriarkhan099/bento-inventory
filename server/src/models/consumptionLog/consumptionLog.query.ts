import { Op } from "sequelize";
import ConsumptionLog from "./consumptionLog.model";
import { IConsumptionLog } from "../../interfaces/consumptionLog.interface";

export async function findAllConsumptionLogsOfRestaurant (restaurantId: number) {
  try {
    const consumptionLogs = await ConsumptionLog.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    return consumptionLogs;
  } catch (error) {
    throw new Error('Error finding consumption logs.');
  }
}

export async function findConsumptionLogsByIngredientName (restaurantId: number, ingredientName: string) {
  try {
    const consumptionLogs = await ConsumptionLog.findAll({
      where: {
        restaurantId: restaurantId,
        ingredientName: {
          [Op.like]: `%${ingredientName}%`
        }
      }
    });

    return consumptionLogs;
  } catch (error) {
    throw new Error('Error finding consumption logs.');
  }
}

export async function createConsumptionLogOfRestaurant (consumptionLog: IConsumptionLog, restaurantId: number) {
    try {
        consumptionLog.restaurantId = restaurantId;
        const newConsumptionLog = await ConsumptionLog.create(consumptionLog);
        return newConsumptionLog;
    } catch (error) {
        throw new Error('Error creating consumption log.');
    }
}

export async function updateConsumptionLog (consumptionLogId: number, consumptionLog: IConsumptionLog) {
  try {
    const updatedConsumptionLog = await ConsumptionLog.update(consumptionLog, {
      where: {
        id: consumptionLogId
      }
    });
    return updatedConsumptionLog;
  } catch (error) {
    throw new Error('Error updating consumption log.');
  }
}

export async function deleteConsumptionLog (consumptionLogId: number) {
  try {
    const deletedConsumptionLog = await ConsumptionLog.destroy({
      where: {
        id: consumptionLogId
      }
    });
    return deletedConsumptionLog;
  } catch (error) {
    throw new Error('Error deleting consumption log.');
  }
}
