import { Op } from "sequelize";
import sequelize from "../index";
import DeliveryBox from "./deliveryBox.model";
import { IDeliveryBox } from "../../interfaces/deliveryBox.interface";
import DeliveryBoxBatch from "../deliveryBoxBatch/deliveryBoxBatch.model";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";
import { deductDeliveryBoxInFIFO } from "../deliveryBoxBatch/deliveryBoxBatch.query";
import { DeliveryBoxToReduce, DeductedDeliveryBox } from "../../interfaces/deductDeliveryBox.interface";

export async function findAllDeliveryBoxesOfRestaurant(restaurantId: number) {
  try {
    const deliveryBoxes = await DeliveryBox.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    return deliveryBoxes;
  } catch (error) {
    throw new Error("Error finding delivery boxes.");
  }
}

export async function findDeliveryBoxesByBoxName(
  restaurantId: number,
  boxName: string
) {
  try {
    const deliveryBoxes = await DeliveryBox.findAll({
      where: {
        restaurantId: restaurantId,
        boxName: {
          [Op.like]: `%${boxName}%`,
        },
      },
    });

    return deliveryBoxes;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding delivery boxes.");
  }
}

export async function createDeliveryBoxOfRestaurant(
  deliveryBox: IDeliveryBox,
  restaurantId: number
) {
  try {
    deliveryBox.restaurantId = restaurantId;
    const newDeliveryBox = await DeliveryBox.create(deliveryBox);
    return newDeliveryBox;
  } catch (error) {
    throw new Error("Error creating delivery box.");
  }
}

export async function updateDeliveryBox(
  deliveryBoxId: number,
  deliveryBox: IDeliveryBox
) {
  try {
    const updatedDeliveryBox = await DeliveryBox.update(deliveryBox, {
      where: {
        id: deliveryBoxId,
      },
    });
    return updatedDeliveryBox;
  } catch (error) {
    throw new Error("Error updating delivery box.");
  }
}

export async function deleteDeliveryBox(deliveryBoxId: number) {
  try {
    const deletedDeliveryBox = await DeliveryBox.destroy({
      where: {
        id: deliveryBoxId,
      },
    });
    return deletedDeliveryBox;
  } catch (error) {
    throw new Error("Error deleting delivery box.");
  }
}

export async function findOneDeliveryBoxOfRestaurant(deliveryBoxId: number) {
  try {
    const deliveryBox = await DeliveryBox.findOne({
      where: {
        id: deliveryBoxId,
      },
    });

    return deliveryBox;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function updateCurrentStockQuantityOfDeliveryBox (deliveryBoxId: number) {
  try {
    const deliveryBox = await findOneDeliveryBoxOfRestaurant(deliveryBoxId);
    let updatedDeliveryBox;
    if (deliveryBox) {
      let totalStockQuantity = await DeliveryBoxBatch.sum("currentStockQuantity",
      {
        where: {
          currentStockQuantity: {
            [Op.ne]: 0,
          },
          deliveryBoxId: deliveryBox.id,
        },
      }
    );

    if (!totalStockQuantity) {
      totalStockQuantity = 0;
    }

    updatedDeliveryBox = await DeliveryBox.update(
      {
        currentStockQuantity: totalStockQuantity,
      },
      {
        where: {
          id: deliveryBox.id,
        },
      }
    );
    }
    else {
      throw new Error('Delivery box not found.');
    }

    return updatedDeliveryBox;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating global delivery box.");
  }
}

export async function updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(deliveryBoxBatch: IDeliveryBoxBatch) {
  try {
    const deliveryBox = await findOneDeliveryBoxOfRestaurant(deliveryBoxBatch.deliveryBoxId);
    let updatedDeliveryBox;

    if (deliveryBox) {

      await updateCurrentStockQuantityOfDeliveryBox(deliveryBox.id);

      const averageCostPerUnit = await DeliveryBoxBatch.findOne({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('costPerUnit')), 'costPerUnit']
        ],
        where: {
          deliveryBoxId: deliveryBox.id,
          receivedAt: {
            [Op.gte]: sequelize.literal("NOW() - INTERVAL '1 YEAR'"),
          },
        },
      });

      updatedDeliveryBox = await deliveryBox.update(
        {
          costPerUnit: averageCostPerUnit ? averageCostPerUnit.dataValues.costPerUnit : 0,
        },
        {
          where: {
            id: deliveryBoxBatch.deliveryBoxId,
          },
        }
      );
    } else {
      throw new Error('Delivery box not found.');
    }
      return updatedDeliveryBox;
    } catch (error) {
      throw new Error('Error updating global delivery box.');
    }
  }

  export async function deductDeliveryBoxesFromOrder(order: {orderType: string; deliveryBoxesToReduce: DeliveryBoxToReduce[]; restaurantId: number;}) {

    const { orderType, deliveryBoxesToReduce, restaurantId } = order;
  
    const transaction = await sequelize.transaction();
  
    try {
      const deductedDeliveryBoxes: DeductedDeliveryBox[] = [];
  
      for (const deliveryBoxToReduce of deliveryBoxesToReduce) {
        const { id, quantity } = deliveryBoxToReduce;
  
        const deliveryBox = await findOneDeliveryBoxOfRestaurant(id);
  
        if (deliveryBox) {
          const deductedBatches = await deductDeliveryBoxInFIFO(
            deliveryBox.id,
            quantity,
            orderType
          );
  
          updateCurrentStockQuantityOfDeliveryBox(deliveryBox.id);
          deductedDeliveryBoxes.push({
            deliveryBoxId: deliveryBox.id,
            deductedDeliveryBoxBatches: deductedBatches,
          });
        } else {
          throw new Error("Delivery box not found.");
        }
      }
  
      await transaction.commit();
      return deductedDeliveryBoxes;
    }
    catch (error) {
      await transaction.rollback();
      throw new Error(`Error deducting delivery boxes: ${error}`);
    }
  }