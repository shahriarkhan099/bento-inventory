import { Op } from "sequelize";
import Ingredient from "./ingredient.model";
import Category from "../category/category.model";
import { IIngredient } from "../../interfaces/ingredient.interface";

export async function findAllIngredientOfRestaurant (restaurantId: number) {
    try {
      const ingredient = await Ingredient.findAll({
        where: {
          restaurantId: restaurantId
        }
      });
  
      return ingredient;
    } catch (error) {
      throw new Error('Error finding ingredients.');
    }
}

export async function addIngredientToRestaurant (ingredient: IIngredient) {
    try {
      ingredient.costPerUnit = ingredient.purchasePrice / ingredient.currentStockQuantity;
      const newIngredient = await Ingredient.create(ingredient);
      return newIngredient;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating ingredient.');
    }
}

export async function findIngredientBySearchTerm (restaurantId: number, searchTerm: string) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        ingredientName: {[Op.iLike]: `%${searchTerm}%`},
        restaurantId: restaurantId
      }
    });
    return ingredient;
  } catch (error) {
    throw new Error('Error searching for ingredient.');
  }
}

export async function updateIngredientOfRestaurant (ingredientId: number, ingredient: IIngredient) {
  try {
    const updatedIngredient = await Ingredient.update(ingredient, {
      where: {
        id: ingredientId
      }
    });
    return updatedIngredient;
  } catch (error) {
    throw new Error('Error updating ingredient.');
  }
}

export async function deleteIngredientOfRestaurant (ingredientId: number) {
  try {
    const deletedIngredient = await Ingredient.destroy({
      where: {
        id: ingredientId
      }
    });
    return deletedIngredient;
  } catch (error) {
    throw new Error('Error deleting ingredient.');
  }
}

export async function findIngredientWithCategory (restaurantId: number) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId
      },
      include: [Category]
    });
    return ingredient;
  } catch (error) {
    throw new Error('Error finding ingredient.');
  }
}

export async function findIngredientsByCategoryName (restaurantId: number, categoryName: string) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId
      },
      include: [{
        model: Category,
        where: {
          categoryName: categoryName
        }
      }]
    });
    return ingredient;
  } catch (error) {
    throw new Error('Error finding ingredient.');
  }
}

export async function addIngredientToCategory (ingredientId: number, categoryId: number) {
  try {
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (ingredient) {
      ingredient.categoryId = categoryId;
      await updateIngredientOfRestaurant(ingredient.id, ingredient);
    }
    return ingredient;
  } catch (error) {
    throw new Error('Error adding ingredient to category.');
  }
}