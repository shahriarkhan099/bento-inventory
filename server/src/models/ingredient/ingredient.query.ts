import { Op } from "sequelize";
import sequelize from "../index";
import Ingredient from "./ingredient.model";
import Category from "../category/category.model";
import { IIngredient, ICreateIngredient } from "../../interfaces/ingredient.interface";
import IngredientBatch from "../ingredientBatch/ingredientBatch.model";
import { IIngredientBatch } from "../../interfaces/ingredientBatch.interface";
import { deductIngredientBatchesInFIFO, getTotalAmountOfIngredientThatExpiresInSpecificDate } from "../ingredientBatch/ingredientBatch.query";
import {
  IngredientToReduce,
  DeductedIngredient,
} from "../../interfaces/deductIngredient.interface";
import { findAvgConsumptionOfIngredientOfLastTwoWeeks } from "../consumptionLog/consumptionLog.query";


export async function findIngredientbyId(ingredientId: number) {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        id: ingredientId,
      },
      include: [Category],
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findIngredientByIngredientUniqueId (restaurantId: number, ingredientUniqueId: number) {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        uniqueIngredientId: ingredientUniqueId,
        restaurantId: restaurantId
      }
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findAllIngredientOfRestaurant(restaurantId: number) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function addIngredientToRestaurant(ingredient: ICreateIngredient) {
  try {
    const checkExistent = await findIngredientByIngredientUniqueId(ingredient.restaurantId, ingredient.uniqueIngredientId);

    if (!checkExistent) {
      if (ingredient.unitOfStock === "kg") {
        ingredient.unitOfStock = "gm";
      } else if (ingredient.unitOfStock === "litre") {
        ingredient.unitOfStock = "ml";
      }
      const newIngredient = await Ingredient.create(ingredient);
      return newIngredient;
    } else {
      throw new Error("Ingredient already exists.");
    }

  } catch (error) {
    console.log(error);
    throw new Error("Error creating global ingredient.");
  }
}

export async function findIngredientBySearchTerm(
  restaurantId: number,
  searchTerm: string
) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        ingredientName: { [Op.iLike]: `%${searchTerm}%` },
        restaurantId: restaurantId,
      },
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error searching for global ingredient.");
  }
}

export async function updateIngredientOfRestaurant (ingredientId: number, ingredient: IIngredient) {
  try {
    const updatedIngredient = await Ingredient.update(ingredient, {
      where: {
        id: ingredientId,
      },
    });
    return updatedIngredient;
  } catch (error) {
    throw new Error("Error updating global ingredient.");
  }
}

export async function deleteIngredientOfRestaurant(ingredientId: number) {
  try {
    const deletedIngredient = await Ingredient.destroy({
      where: {
        id: ingredientId,
      },
    });
    return deletedIngredient;
  } catch (error) {
    throw new Error("Error deleting global ingredient.");
  }
}

export async function findIngredientWithCategory(restaurantId: number) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [Category],
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findIngredientsByIngredientName(
  restaurantId: number,
  ingredientName: string
) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        ingredientName: ingredientName,
        restaurantId: restaurantId,
      },
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findIngredientsByCategoryName(
  restaurantId: number,
  categoryName: string
) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: Category,
          where: {
            categoryName: categoryName,
          },
        },
      ],
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findAllIngredientOfRestaurantWithCategoryAndIngredientBatch( restaurantId: number ) {
  try {
    const ingredient = await Ingredient.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: Category,
        },
        {
          model: IngredientBatch,
        },
      ],
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findOneIngredientOfRestaurant(ingredientId: number) {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        id: ingredientId,
      },
    });

    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function updateCurrentStockQuantityOfIngredient(ingredientId: number) {
  try {
    const ingredient = await findOneIngredientOfRestaurant(ingredientId);
    let updatedIngredient;
    if (ingredient) {
      let totalStockQuantity = await IngredientBatch.sum(
        "currentStockQuantity",
        {
          where: {
            currentStockQuantity: {
              [Op.ne]: 0,
            },
            ingredientId: ingredient.id,
          },
        }
      );

      if (!totalStockQuantity) {
        totalStockQuantity = 0;
      }
      
      updatedIngredient = await Ingredient.update(
        {
          currentStockQuantity: totalStockQuantity,
        },
        {
          where: {
            id: ingredient.id,
          },
        }
      ); 
    }
    else {
      throw new Error('Ingredient not found.');
    }

    return updatedIngredient;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating global ingredient.");
  }
}

export async function updateIngredientInfoOfRestaurantWithNewIngredientBatch(ingredientBatch: IIngredientBatch) {
  try {
    const ingredient = await findOneIngredientOfRestaurant(ingredientBatch.ingredientId);
    let updatedIngredient;

    if (ingredient) {

      await updateCurrentStockQuantityOfIngredient(ingredient.id);

      const averageCostPerUnit = await IngredientBatch.findOne({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("costPerUnit")), "costPerUnit"],
        ],
        where: {
          ingredientId: ingredient.id,
          receivedAt: {
            [Op.gte]: sequelize.literal("NOW() - INTERVAL '1 YEAR'"),
          },
        },
      });

      updatedIngredient = await Ingredient.update(
        {
          costPerUnit: averageCostPerUnit
            ? averageCostPerUnit.dataValues.costPerUnit
            : 0,
        },
        {
          where: {
            id: ingredientBatch.ingredientId,
          },
        }
      );
    } else {
      throw new Error("Ingredient not found.");
    }

    return updatedIngredient;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating global ingredient.");
  }
}

export async function deductIngredientsFromOrder(order: {orderType: string; ingredientsToReduce: IngredientToReduce[]; restaurantId: number;}) {
  const { orderType, ingredientsToReduce, restaurantId } = order;

  const transaction = await sequelize.transaction();

  try {
    const deductedIngredients: DeductedIngredient[] = [];

    for (const ingredientToReduce of ingredientsToReduce) {
      const { id, quantity } = ingredientToReduce;
      
      const ingredient = await findIngredientbyId(id);

      if (ingredient) {
        const deductedBatches = await deductIngredientBatchesInFIFO(ingredient.id, quantity, orderType);

        updateCurrentStockQuantityOfIngredient(ingredient.id);
        deductedIngredients.push({ingredientId: ingredient.id, deductedIngredientBatches: deductedBatches,});
        // check reorder point by ingredient id
        // if (ingredient.currentStockQuantity <= ingredient.reorderPoint) {
        //   console.log("Reorder point reached.");
        // }
      } else {
        throw new Error(`Ingredient with ID ${id} not found.`);
      }
    }
    
    await transaction.commit();
    return deductedIngredients;
  } catch (error) {
    throw new Error(`Error deducting ingredients: ${error}`);
  }
}

export async function findOneIngredientOfRestaurantWithUniqueIngredientId(uniqueIngredientId: number, restaurantId: number) {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        uniqueIngredientId: uniqueIngredientId,
        restaurantId: restaurantId
      }
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function findOneIngredientWithUniqueIngredientId(uniqueIngredientId: number) {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        uniqueIngredientId: uniqueIngredientId,
      },
      order: [
        ['createdAt', 'ASC']
      ]
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function checkAllIngredientOfAllRestaurantsIfNeededToOrderList () {
  try {
    const ingredients = await Ingredient.findAll();

    let ingredientsToOrder: IIngredient[] = [];

    for (const ingredient of ingredients) {

      const hundredPercentIngredientAmount = await findAvgConsumptionOfIngredientOfLastTwoWeeks(ingredient.id, 3);
      console.log("ingredient", ingredient.ingredientName);
      console.log("hundredPercentIngredientAmount", hundredPercentIngredientAmount);
      
      const todayDateWithOnlyDate = new Date(new Date().setHours(0, 0, 0, 0));
      const totalAmountOfIngredientThatExpiresToday = await getTotalAmountOfIngredientThatExpiresInSpecificDate(ingredient.id, todayDateWithOnlyDate);
      const totalAmountOfIngredientThatExpiresTomorrow = await getTotalAmountOfIngredientThatExpiresInSpecificDate(ingredient.id, new Date(todayDateWithOnlyDate.setDate(todayDateWithOnlyDate.getDate() + 1)));
      const totalAmountOfIngredientThatExpiresInThreeDays = await getTotalAmountOfIngredientThatExpiresInSpecificDate(ingredient.id, new Date(todayDateWithOnlyDate.setDate(todayDateWithOnlyDate.getDate() + 2)));

      if ((ingredient.currentStockQuantity <= ingredient.reorderPoint && ingredient.reorderPoint !== 0) 
      && ingredient.currentStockQuantity <= (hundredPercentIngredientAmount * 0.2)) {
        ingredientsToOrder.push(ingredient);
      } else if (totalAmountOfIngredientThatExpiresToday) {
        if ((ingredient.currentStockQuantity - totalAmountOfIngredientThatExpiresToday) <= (hundredPercentIngredientAmount * 0.2)) {
          ingredientsToOrder.push(ingredient);
        }
      } else if (totalAmountOfIngredientThatExpiresTomorrow) {
        if ((ingredient.currentStockQuantity - totalAmountOfIngredientThatExpiresTomorrow) <= (hundredPercentIngredientAmount * 0.2)) {
          ingredientsToOrder.push(ingredient);
        }
      } else if (totalAmountOfIngredientThatExpiresInThreeDays) {
        if ((ingredient.currentStockQuantity - totalAmountOfIngredientThatExpiresInThreeDays) <= (hundredPercentIngredientAmount * 0.2)) {
          ingredientsToOrder.push(ingredient);
        }
      }

    }

    return ingredientsToOrder;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

export async function checkAllIngredientOfRestaurantIfNeededToOrderListWithFrequencyDays (frequencyDays: number) {
  try {
    const ingredients = await Ingredient.findAll();

    let ingredientsToOrder: IIngredient[] = [];

    for (const ingredient of ingredients) {

      const hundredPercentIngredientAmount = await findAvgConsumptionOfIngredientOfLastTwoWeeks(ingredient.id, frequencyDays);
      const todayDateWithOnlyDate = new Date(new Date().setHours(0, 0, 0, 0));

      if ( (ingredient.currentStockQuantity <= ingredient.reorderPoint && ingredient.reorderPoint !== 0) 
      || ingredient.currentStockQuantity <= (hundredPercentIngredientAmount * 0.2)) {
        ingredientsToOrder.push(ingredient);
      } 
      else {
        for (let i = 0; i < frequencyDays; i++) {
          let currentDate = new Date(todayDateWithOnlyDate.getTime());
          currentDate.setDate(currentDate.getDate() + i);
          const totalWastageAmount = await getTotalAmountOfIngredientThatExpiresInSpecificDate(ingredient.id, currentDate);
          if (totalWastageAmount) {
            if ((ingredient.currentStockQuantity - totalWastageAmount) <= (hundredPercentIngredientAmount * 0.2)) {
              ingredientsToOrder.push(ingredient);
            }
          }
        }

      }
    }

    console.log("Before Converting", ingredientsToOrder);
    
    let ingredientsWithRestaurants = sortIngredientsByRestaurant(ingredientsToOrder);

    console.log("After Converting", ingredientsWithRestaurants);

    return ingredientsWithRestaurants;
  } catch (error) {
    throw new Error("Error finding global ingredient.");
  }
}

function sortIngredientsByRestaurant(ingredients: IIngredient[]): Record<number, IIngredient[]> {
  const ingredientsByRestaurant: Record<number, IIngredient[]> = {};

  ingredients.forEach((ingredient) => {
    const { restaurantId } = ingredient;
    if (!ingredientsByRestaurant[restaurantId]) {
      ingredientsByRestaurant[restaurantId] = [];
    }
    ingredientsByRestaurant[restaurantId].push(ingredient);
  });

  return ingredientsByRestaurant;
}