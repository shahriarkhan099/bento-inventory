import { Op } from "sequelize";
import Ingredient from "./ingredient.model";


export async function findAllIngredientOfRestaurant (id: number) {
    try {
      const ingredient = await Ingredient.findAll({
        where: {
          restaurantId: id
        }
      });
  
      return ingredient;
    } catch (error) {
      throw new Error('Error finding ingredient of the restaurant.');
    }
}
  
  
export async function addIngredientToRestaurant (restaurantId: number, 
    data: { name: string, unit: string, stockQuantity: number,  purchasePrice: number, costPerUnit?: number, 
        caloriesPerUnit?: number, expirationDate?: Date, reorderPoint?: number, description?: string, imageUrl?: string, 
        idealStoringTemperature?: number }) {
    try {
      const newIngredient = await Ingredient.create({ ...data, restaurantId, receivedAt: new Date() });
      return newIngredient;
    } catch (error) {
      throw new Error('Error adding ingredient to the restaurant.');
    }
}
  
  
export async function findIngredientBySearchTerm (searchTerm: string) {
    try {
      const ingredient = await Ingredient.findAll({
        where: {
          name: {[Op.iLike]: `%${searchTerm}%`}
        },
        // include: [Restaurant]
      });
      return ingredient;
    } catch (error) {
      throw new Error('Error searching for ingredient.');
    }
}