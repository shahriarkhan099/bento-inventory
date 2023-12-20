import { Op } from "sequelize";
import Category from "./category.model";
import Ingredient from "../category/category.model";

export async function findAllCategoryOfRestaurant (id: number) {
    try {
      const category = await Category.findAll({
        where: {
          restaurantId: id
        }
      });
  
      return category;
    } catch (error) {
      throw new Error('Error finding category of the restaurant.');
    }
}

export async function findAllIngredientOfCategoryOfRestaurant (categoryId: number, restaurantId: number) {
    try {
      const category = await Category.findAll({
        where: {
          id: categoryId,
          restaurantId: restaurantId
        }, include: [{
            model: Ingredient,
            required: true
           }]

      });
  
      return category;
    } catch (error) {
      throw new Error('Error finding ingredient of the category.');
    }
}
  

export async function addCategoryToRestaurant (restaurantId: number, 
    data: { ingredientId: number, categoryName: string, imageUrl?: string, storageShelf?: string, storageType?: string, description?: 
        string, vegetarian?: boolean, vegan?: boolean }) {
    try {
      const newCategory = await Category.create({ ...data, restaurantId });
      return newCategory;
    } catch (error) {
      throw new Error('Error adding category to the restaurant.');
    }
}
  
  
export async function findCategoryBySearchTerm (id: number, searchTerm: string) {
    try {
      const category = await Category.findAll({
        where: {
          categoryName: {[Op.iLike]: `%${searchTerm}%`},
          restaurantId: id
        }
      });
      return category;
    } catch (error) {
      throw new Error('Error searching for category.');
    }
}