import { Op, WhereOptions, QueryTypes } from "sequelize";
import sequelize from "..";
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

    if (ingredientsToReduce.length !== 0) {
      await deductIngredientsFromOrder({ingredientsToReduce, orderType, restaurantId});
    }
    if (deliveryBoxesToReduce.length !== 0) {
      await deductDeliveryBoxesFromOrder({deliveryBoxesToReduce, orderType, restaurantId});
    }

    return { success: true };
  } catch (error) {
    throw new Error('Error deducting ingredients and delivery boxes from order.');
  }
}

export async function findAvgConsumptionOfIngredientOfLastTwoWeekForCurrentDay(productId: number) {
  try {
    const currentDayOfWeek = new Date().getDay();

    const avgConsumption: any = await ConsumptionLog.findAll({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("quantity")), "avgConsumption"],
      ],
      where: {
        itemId: productId,
        consumedAt: {
          [Op.gte]: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
          [Op.and]: sequelize.where(sequelize.fn("DAYOFWEEK", sequelize.col("consumedAt")), currentDayOfWeek),
        },
      } as WhereOptions<IConsumptionLog>,
    });
    return avgConsumption;
  } catch (error) {
    throw new Error('Error finding average consumption of ingredient.');
  }
}

export async function findAvgConsumptionOfIngredientOfLastTwoMonthForCurrentDay(productId: number) {
  try {
    const currentDayOfWeek = new Date().getDay();

    const avgConsumption: any = await ConsumptionLog.findAll({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("quantity")), "avgConsumption"],
      ],
      where: {
        itemId: productId,
        consumedAt: {
          [Op.gte]: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000),
          [Op.and]: sequelize.where(sequelize.fn("DAYOFWEEK", sequelize.col("consumedAt")), currentDayOfWeek),
        },
      } as WhereOptions<IConsumptionLog>,
    });
    return avgConsumption;
  } catch (error) {
    throw new Error('Error finding average consumption of ingredient.');
  }
}

// need to adjust this function to get the average consumption of the last two weeks
export async function findAvgConsumptionOfIngredientOfLastTwoWeeks(productId: number, frequencyDays: number) {
  try {
    const consumptionLogs: any[] = await ConsumptionLog.findAll({ 
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('consumedAt')), 'day'],
        [sequelize.fn("AVG", sequelize.col("quantity")), "avgQuantity"],
      ],
      where: {
        itemId: productId,
        consumedAt: {
          [Op.gte]: sequelize.literal("CURRENT_DATE - INTERVAL '14 days'"),
        },
      },
      group: [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('consumedAt'))],
      raw: true,
    });

    let avgAmount = consumptionLogs.reduce((total, log) => total + log.avgQuantity, 0) / consumptionLogs.length;

    if (!avgAmount) {
      avgAmount = 0;
    }

    return Math.ceil(avgAmount);
  } catch (error) {
    console.log(error);
    
    throw new Error('Error finding average consumption of ingredient.');
  }
}

export async function findAvgConsumptionOfIngredientOfLastTwoMonthWithfrequencyDays(productId: number, frequencyDays: number) {
  try {
    const currentDayOfWeek = new Date().getDay();

    const frequencyDaysArray = Array.from({ length: frequencyDays }, (_, index) => (currentDayOfWeek + index + 1) % 7);

    const avgConsumption: any = await ConsumptionLog.findAll({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("quantity")), "avgConsumption"],
      ],
      where: {
        itemId: productId,
        consumedAt: {
          [Op.gte]: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000),
          [Op.and]: sequelize.where(sequelize.fn("DAYOFWEEK", sequelize.col("consumedAt")), {
            [Op.or]: frequencyDaysArray,
          }),
        },
      } as WhereOptions<IConsumptionLog>,
    });
    return avgConsumption;
  } catch (error) {
    throw new Error('Error finding average consumption of ingredient.');
  }
}

export async function findAvgConsumptionOfIngredientOfLastTwoWeekWihSpecificDay(productId: number, day: number) {
  try {
    const avgConsumption: any = await ConsumptionLog.findAll({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("quantity")), "avgConsumption"],
      ],
      where: {
        itemId: productId,
        consumedAt: {
          [Op.gte]: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
          [Op.and]: sequelize.where(sequelize.fn("DAYOFWEEK", sequelize.col("consumedAt")), day),
        },
      } as WhereOptions<IConsumptionLog>,
    });
    return avgConsumption;
  } catch (error) {
    throw new Error('Error finding average consumption of ingredient.');
  }
}