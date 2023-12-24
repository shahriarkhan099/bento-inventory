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
  
  
export async function findCategoryBySearchTerm (restaurantId: number, searchTerm: string) {
    try {
      const category = await Category.findAll({
        where: {
          categoryName: {[Op.iLike]: `%${searchTerm}%`},
          restaurantId: restaurantId
        }
      });
      return category;
    } catch (error) {
      throw new Error('Error searching for category.');
    }
}

export async function updateCategoryOfRestaurant (categoryId: number, category: ICategory) {
    try {
      const updatedCategory = await Category.update(category, {
        where: {
          id: categoryId
        }
      });
      return updatedCategory;
    } catch (error) {
      throw new Error('Error updating category.');
    }
}

export async function deleteCategoryOfRestaurant (categoryId: number) {
    try {
      const deletedCategory = await Category.destroy({
        where: {
          id: categoryId
        }
      });
      return deletedCategory;
    } catch (error) {
      throw new Error('Error deleting category.');
    }
}


