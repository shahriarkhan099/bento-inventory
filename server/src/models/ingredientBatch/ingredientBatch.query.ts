import { Op } from "sequelize";
import Ingredient from "./ingredientBatch.model";
import Category from "../category/category.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";
import { createConsumptionLogOfRestaurantFromDeduction } from "../consumptionLog/consumptionLog.query";

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

export async function addIngredientToRestaurant (ingredient: IIngredientBatch) {
    try {
      const newIngredient = await Ingredient.create(ingredient);
      return newIngredient;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating ingredient.');
    }
}

export async function updateIngredientOfRestaurant (ingredientId: number, ingredient: IIngredientBatch) {
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

export async function deductIngredientBatchesInFIFO (ingredientId: number, quantity: number, orderType: string) {
  try {
    const ingredientBatches = await Ingredient.findAll({
      where: {
        ingredientId: ingredientId,
        currentStockQuantity: {
          [Op.gt]: 0
        },
      },
      order: [
        ['createdAt', 'ASC']
      ]
    });

    let remainingQuantity = quantity;

    for (let i = 0; i < ingredientBatches.length; i++) {
      if (remainingQuantity === 0) {
        break;
      }
      if (ingredientBatches[i].currentStockQuantity > remainingQuantity) {
        ingredientBatches[i].currentStockQuantity -= remainingQuantity;
        remainingQuantity = 0;
      } else {
        remainingQuantity -= ingredientBatches[i].currentStockQuantity;
        ingredientBatches[i].currentStockQuantity = 0;
      }
      await ingredientBatches[i].save();

      await createConsumptionLogOfRestaurantFromDeduction({
        restaurantId: ingredientBatches[i].restaurantId,
        ingredientId: ingredientId,
        quantity: quantity,
        orderType: orderType,
        ingredientName: ingredientBatches[i].ingredientName, 
        unitOfStock: ingredientBatches[i].unitOfStock, 
        costPerUnit: ingredientBatches[i].costPerUnit 
      });
      console.log('consumption log created');
      
    }

    return ingredientBatches;

  } catch (error) {
    console.log(error);
    throw new Error('Error deducting ingredient batches.');
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

