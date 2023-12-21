import { Op } from "sequelize";
import Category from "./category.model";
import { ICategory } from "../../interfaces/category.interface";

export async function findAllCategoryOfRestaurant (restaurantId: number) {
    try {
      const category = await Category.findAll({
        where: {
          restaurantId: restaurantId
        }
      });
  
      return category;
    } catch (error) {
      throw new Error('Error finding category.');
    }
}
  

export async function addCategoryToRestaurant (category: ICategory) {
    try {
      const newCategory = await Category.create(category);
      return newCategory;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating category.');
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