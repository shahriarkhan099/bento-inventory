import { Request, Response } from "express";
import {
  findAllIngredientOfRestaurant,
  addIngredientToRestaurant,
  findIngredientBySearchTerm,
  updateIngredientOfRestaurant,
  deleteIngredientOfRestaurant,
  findIngredientWithCategory,
  findIngredientsByCategoryName,
  findAllIngredientOfRestaurantWithCategoryAndIngredientBatch,
  deductIngredientsFromOrder,
  findIngredientbyId,
  findIngredientByIngredientUniqueId,
  checkAllIngredientOfAllRestaurantsIfNeededToOrderList
} from "../models/ingredient/ingredient.query";
import { IngredientToReduce, DeductedIngredient } from "../interfaces/deductIngredient.interface";

export async function getIngredientbyId(req: Request, res: Response) {
  try {
    const ingredientId = Number(req.params.ingredientId);
    if (ingredientId) {
      const ingredient = await findIngredientbyId(ingredientId);
      res.json({ ingredient: ingredient });
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getIngredientByIngredientUniqueId(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const ingredientUniqueId = Number(req.params.ingredientUniqueId);
    if (restaurantId) {
      const ingredient = await findIngredientByIngredientUniqueId(restaurantId, ingredientUniqueId);
      res.status(200).json({ ingredient: ingredient });
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deductIngredientsController(req: Request, res: Response) {
  try {
    const { orderType, restaurantId, ingredientsToReduce } = req.body;

    if (!restaurantId || !ingredientsToReduce) {
      res.status(400).json({ error: "Missing required parameters" });
      return;
    }

    const order = {
      orderType: orderType, 
      restaurantId: restaurantId,
      ingredientsToReduce: ingredientsToReduce as IngredientToReduce[],
    };

    const deductedIngredients: DeductedIngredient[] = await deductIngredientsFromOrder(
      order
    );

    res.status(200).json({ deductedIngredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllIngredientOfRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const ingredient = await findAllIngredientOfRestaurant(restaurantId);
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postIngredientToRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let ingredient = req.body;
      ingredient.restaurantId = restaurantId;
      if (restaurantId) {
        const newIngredient = await addIngredientToRestaurant(ingredient);
        res.status(201).json("Created");
      } else
        res.status(400).json({ message: "Invalid ingredient information." });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchIngredient(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);

    const search = req.query.q;
    const searchTerm = search?.toString();

    if (searchTerm) {
      const ingredient = await findIngredientBySearchTerm(
        restaurantId,
        searchTerm
      );
      res.json({ ingredients: ingredient });
    } else res.json({ ingredients: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function updateIngredient(req: Request, res: Response) {
  try {
    const ingredientId = Number(req.params.ingredientId);
    if (ingredientId) {
      let ingredient = req.body;
      if (typeof ingredientId === "number") {
        const updatedIngredient = await updateIngredientOfRestaurant(
          ingredientId,
          ingredient
        );
        res.status(200).json("Updated");
      } else
        res.status(400).json({ message: "Invalid ingredient information." });
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteIngredient(req: Request, res: Response) {
  try {
    const ingredientId = Number(req.params.ingredientId);
    if (ingredientId) {
      const deletedIngredient = await deleteIngredientOfRestaurant(
        ingredientId
      );
      res.status(200).json("Deleted");
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getIngredientWithCategory(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const ingredient = await findIngredientWithCategory(restaurantId);
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getIngredientsByCategoryName(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const categoryName = req.params.categoryName;
    if (restaurantId) {
      const ingredient = await findIngredientsByCategoryName(
        restaurantId,
        categoryName
      );
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getAllIngredientOfRestaurantWithCategoryAndIngredientBatch(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const ingredient =
        await findAllIngredientOfRestaurantWithCategoryAndIngredientBatch(
          restaurantId
        );
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function checkAllIngredientOfAllRestaurantsIfNeededToOrderListController(req: Request, res: Response) {
  try {
    const ingredientList = await checkAllIngredientOfAllRestaurantsIfNeededToOrderList();
    res.json({ ingredientList: ingredientList });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

