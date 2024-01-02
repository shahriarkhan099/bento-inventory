import { Op } from "sequelize";
import sequelize from '../index';
import Ingredient from "./ingredient.model";
import Category from "../category/category.model";
import { IIngredient } from "../../interfaces/ingredient.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";

export async function findAllIngredientOfRestaurant (restaurantId: number) {
    try {
      const ingredient = await Ingredient.findAll({
        where: {
          restaurantId: restaurantId
        }
      });
  
      return ingredient;
    } catch (error) {
      throw new Error('Error finding global ingredient.');
    }
}

export async function findOneIngredientOfRestaurant (ingredientId: number) {
    try {
      const ingredient = await Ingredient.findOne({
        where: {
          id: ingredientId
        }
      });
  
      return ingredient;
    } catch (error) {
      throw new Error('Error finding global ingredient.');
    }
}

export async function addIngredientToRestaurant (ingredient: IIngredient) {
    try {
      const newIngredient = await Ingredient.create(ingredient);
      return newIngredient;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating global ingredient.');
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
      throw new Error('Error searching for global ingredient.');
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
      throw new Error('Error updating global ingredient.');
    }
}

export async function updateIngredientInfoOfRestaurantWithNewIngredientBatch (ingredientBatch: IIngredientBatch) {
  try {

    const ingredient = await findOneIngredientOfRestaurant(ingredientBatch.ingredientId);
    let updatedIngredient;

    if (ingredient) {

      const totalStockQuantity = await IngredientBatch.sum('currentStockQuantity', {
        where: {
          currentStockQuantity: {
            [Op.ne]: 0
          },
          ingredientId: ingredient.id
        }
      });

      const averageCostPerUnit = await IngredientBatch.findOne({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('costPerUnit')), 'costPerUnit']
        ],
        where: {
          ingredientId: ingredient.id,
          receivedAt: {
            [Op.gte]: sequelize.literal('NOW() - INTERVAL \'1 YEAR\'')
          }
        }
      });

      updatedIngredient = await Ingredient.update({
        currentStockQuantity: totalStockQuantity,
        costPerUnit: averageCostPerUnit ? averageCostPerUnit.dataValues.costPerUnit : 0
      }, {
        where: {
            id: ingredientBatch.ingredientId
        }
      });
      
    } else {
      throw new Error('Ingredient not found.');
    }

    return updatedIngredient;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating global ingredient.');
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
      throw new Error('Error deleting global ingredient.');
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
    throw new Error('Error finding global ingredient.');
  }
}

export async function findIngredientsByIngredientName (restaurantId: number, ingredientName: string) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        ingredientName: ingredientName,
        restaurantId: restaurantId
      }
    });
    return ingredient;
  } catch (error) {
    throw new Error('Error finding global ingredient.');
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
    throw new Error('Error finding global ingredient.');
  }
}

export async function findAllIngredientOfRestaurantWithCategoryAndIngredientBatch (restaurantId: number) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId
      },
      include: [{
        model: Category
      }, {
        model: IngredientBatch
      }]
    });
    return ingredient;
  } catch (error) {
    throw new Error('Error finding global ingredient.');
  }
}
