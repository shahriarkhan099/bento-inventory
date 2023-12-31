import { Op } from "sequelize";
import { IDeliveryBox } from "../../interfaces/deliveryBox.interface";
import DeliveryBox from "./deliveryBox.model";

export async function findAllDeliveryBoxesOfRestaurant (restaurantId: number) {
  try {
    const deliveryBoxes = await DeliveryBox.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    return deliveryBoxes;
  } catch (error) {
    throw new Error('Error finding delivery boxes.');
  }
}

export async function findDeliveryBoxesByBoxName (restaurantId: number, boxName: string) {
  try {
    const deliveryBoxes = await DeliveryBox.findAll({
      where: {
        restaurantId: restaurantId,
        boxName: {
          [Op.like]: `%${boxName}%`
        }
      }
    });

    return deliveryBoxes;
  } catch (error) {
    throw new Error('Error finding delivery boxes.');
  }
}

export async function createDeliveryBoxOfRestaurant (deliveryBox: IDeliveryBox, restaurantId: number) {
    try {
        deliveryBox.restaurantId = restaurantId;
        const newDeliveryBox = await DeliveryBox.create(deliveryBox);
        return newDeliveryBox;
    } catch (error) {
        throw new Error('Error creating delivery box.');
    }
}

export async function updateDeliveryBox (deliveryBoxId: number, deliveryBox: IDeliveryBox) {
  try {
    const updatedDeliveryBox = await DeliveryBox.update(deliveryBox, {
      where: {
        id: deliveryBoxId
      }
    });
    return updatedDeliveryBox;
  } catch (error) {
    throw new Error('Error updating delivery box.');
  }
}

export async function deleteDeliveryBox (deliveryBoxId: number) {
  try {
    const deletedDeliveryBox = await DeliveryBox.destroy({
      where: {
        id: deliveryBoxId
      }
    });
    return deletedDeliveryBox;
  } catch (error) {
    throw new Error('Error deleting delivery box.');
  }
}
