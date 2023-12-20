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
    data: { ingredientName: string, unit: string, stockQuantity: number,  purchasePrice: number, costPerUnit?: number, 
        caloriesPerUnit?: number, expirationDate?: Date, reorderPoint?: number, description?: string, idealStoringTemperature?: number }) {
    try {
      const newIngredient = await Ingredient.create({ ...data, restaurantId, receivedAt: new Date() });
      return newIngredient;
    } catch (error) {
      throw new Error('Error adding ingredient to the restaurant.');
    }
}
  
  
export async function findIngredientBySearchTerm (id: number, searchTerm: string) {
    try {
      const ingredient = await Ingredient.findAll({
        where: {
          ingredientName: {[Op.iLike]: `%${searchTerm}%`},
          restaurantId: id
        }
      });
      return ingredient;
    } catch (error) {
      throw new Error('Error searching for ingredient.');
    }
}