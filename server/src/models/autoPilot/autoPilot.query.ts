import { Op } from "sequelize";
import { IAutoPilot } from "../../interfaces/autoPilot.interface";
import AutoPilot from "./autoPilot.model";
  
export async function findAutoPilotOfRestaurant (restaurantId: number) {
    try {
      const autoPilot = await AutoPilot.findOne({
        where: {
          restaurantId: restaurantId
        }
      });
  
      return autoPilot;
    } catch (error) {
      throw new Error('Error finding category.');
    }
}

export async function createAutoPilotOfRestaurant (restaurantId: number) {
        try {
            const autoPilot = await AutoPilot.create({
                restaurantId: restaurantId,
                autoPilotSwitch: "On"
            });
    
            return autoPilot;
        } catch (error) {
            throw new Error('Error finding category.');
        }
}

export async function updateAutoPilotOfRestaurant (restaurantId: number, autoPilotSwitch: string) {
    try {
      const autoPilot = await AutoPilot.update({
        autoPilotSwitch: autoPilotSwitch,
      }, {
        where: {
          restaurantId: restaurantId
        }
      });
  
      return autoPilot;
    } catch (error) {
      throw new Error('Error finding category.');
    }
}