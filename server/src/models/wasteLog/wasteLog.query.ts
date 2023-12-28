import { Op } from "sequelize";
import WasteLog from "./wasteLog.model";
import Ingredient from "../ingredientBatch/ingredientBatch.model";
import { IWasteLog } from "../../interfaces/wasteLog.interface";

export async function findAllWasteLogWithIngredient (restaurantId: number) {
    try {
      const wasteLog = await WasteLog.findAll({
        where: {
          restaurantId: restaurantId
        },
        include: [Ingredient]
      });

      return wasteLog;
    } catch (error) {
      throw new Error('Error finding waste logs.');
    }
}

export async function addWasteLog (wasteLog: IWasteLog, restaurantId: number) {
    try {
      wasteLog.restaurantId = restaurantId;
      const createdWasteLog = await WasteLog.create(wasteLog);
      return createdWasteLog;
    } catch (error) {
      throw new Error('Error creating waste log.');
    }
}

export async function updateWasteLog (wasteLogId: number, wasteLog: IWasteLog) {
    try {
      const updatedWasteLog = await WasteLog.update(wasteLog, {
        where: {
          id: wasteLogId
        }
      });
      return updatedWasteLog;
    } catch (error) {
      throw new Error('Error updating waste log.');
    }
}

export async function findWasteLogBySearchTerm (restaurantId: number, searchTerm: string) {
    try {
      const wasteLog = await WasteLog.findAll({
        where: {
          ingredientName: {[Op.iLike]: `%${searchTerm}%`},
          restaurantId: restaurantId
        }
      });
      return wasteLog;
    } catch (error) {
      throw new Error('Error searching for waste log.');
    }
}



