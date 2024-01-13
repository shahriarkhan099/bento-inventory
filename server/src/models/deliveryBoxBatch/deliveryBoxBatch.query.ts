import { Op } from "sequelize";
import DeliveryBox from "./deliveryBoxBatch.model";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";
import { createConsumptionLogOfRestaurantFromDeduction } from "../consumptionLog/consumptionLog.query";

export async function findAllDeliveryBoxOfRestaurant(restaurantId: number) {
  try {
    const deliveryBox = await DeliveryBox.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    return deliveryBox;
  } catch (error) {
    throw new Error("Error finding delivery boxes.");
  }
}

export async function addDeliveryBoxToRestaurant(
  deliveryBox: IDeliveryBoxBatch
) {
  try {
    const newDeliveryBox = await DeliveryBox.create(deliveryBox);
    return newDeliveryBox;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating delivery box.");
  }
}

export async function updateDeliveryBoxOfRestaurant(
  deliveryBoxId: number,
  deliveryBox: IDeliveryBoxBatch
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

export async function deleteDeliveryBoxById(deliveryBoxId: number) {
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

export async function findDeliveryBoxBySearchTerm(
  restaurantId: number,
  searchTerm: string
) {
  try {
    const deliveryBox = await DeliveryBox.findAll({
      where: {
        boxName: {
          [Op.iLike]: `%${searchTerm}%`,
        },
        restaurantId: restaurantId,
      },
    });
    return deliveryBox;
  } catch (error) {
    throw new Error("Error searching for delivery box.");
  }
}

export async function deductDeliveryBoxInFIFO(
    deliveryBoxId: number,
    quantity: number,
    orderType: string
  ) {
    try {
      const deliveryBoxBatches = await DeliveryBox.findAll({
        where: {
          deliveryBoxId: deliveryBoxId,
          currentStockQuantity: {
            [Op.gt]: 0,
          },
        },
        order: [["createdAt", "ASC"]],
      });
  
      let remainingQuantity = quantity;
  
      for (let i = 0; i < deliveryBoxBatches.length; i++) {
        if (remainingQuantity <= 0) {
          break;
        }
  
        const deliveryBoxBatch = deliveryBoxBatches[i];
  
        if (deliveryBoxBatch.currentStockQuantity >= remainingQuantity) {
          deliveryBoxBatch.currentStockQuantity -= remainingQuantity;
          remainingQuantity = 0;
        } else {
          remainingQuantity -= deliveryBoxBatch.currentStockQuantity;
          deliveryBoxBatch.currentStockQuantity = 0;
        }
  
        await deliveryBoxBatch.save();
  
        if (remainingQuantity === 0) {
        await createConsumptionLogOfRestaurantFromDeduction({
          restaurantId: deliveryBoxBatch.restaurantId,
          itemId: deliveryBoxId,
          itemType: "box",
          quantity: quantity,
          orderType: orderType,
          itemName: deliveryBoxBatch.boxName,
          unitOfStock: "piece",
          costPerUnit: deliveryBoxBatch.costPerUnit,
        });
        console.log("consumption log For boxes has created");
      }
      }
      return deliveryBoxBatches;
    } catch (error) {
      throw new Error("Error deducting delivery box.");
    }
  }