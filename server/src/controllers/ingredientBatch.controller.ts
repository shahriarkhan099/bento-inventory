import { Request, Response } from "express";
import { findAllIngredientOfRestaurant, addIngredientToRestaurant, 
  updateIngredientOfRestaurant, deleteIngredientOfRestaurant, findIngredientWithCategory, findIngredientsByCategoryName } from "../models/ingredientBatch/ingredientBatch.query";
import { AuthRequest } from "../interfaces/authRequest.interface";


export async function getAllIngredientOfRestaurant (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    // const restaurantId = req.user?.employeeInformation.restaurantId
    if (restaurantId) {
      const ingredient = await findAllIngredientOfRestaurant(restaurantId);
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postIngredientToRestaurant (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let ingredient = req.body;
      ingredient.restaurantId = restaurantId;
      ingredient.currentStockQuantity = ingredient.purchaseQuantity;
      ingredient.costPerUnit = ingredient.purchasePrice / ingredient.purchaseQuantity;
      if (typeof ingredient.ingredientName === 'string' && typeof ingredient.purchasePrice === 'number') {
        const newIngredient = await addIngredientToRestaurant(ingredient);
        res.status(201).json("Created");
      } else res.status(400).json({ message: "Invalid ingredient information." });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function updateIngredient (req: Request, res: Response) {
  try {
    const ingredientId = Number(req.params.ingredientId);
    if (ingredientId) {
      let ingredient = req.body;
      if (typeof ingredient.ingredientName === 'string' && typeof ingredient.purchasePrice === 'number') {
        const updatedIngredient = await updateIngredientOfRestaurant(ingredientId, ingredient);
        res.status(200).json(updatedIngredient);
      } else res.status(400).json({ message: "Invalid ingredient information." });
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteIngredient (req: Request, res: Response) {
  try {
    const ingredientId = Number(req.params.ingredientId);
    if (ingredientId) {
      const deletedIngredient = await deleteIngredientOfRestaurant(ingredientId);
      res.status(200).json(deletedIngredient);
    } else res.status(400).json({ message: "Invalid ingredient ID." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getIngredientWithCategory (req: Request, res: Response) {
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

export async function getIngredientsByCategoryName (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const categoryName = req.params.categoryName;
    if (restaurantId) {
      const ingredient = await findIngredientsByCategoryName(restaurantId, categoryName);
      res.json({ ingredients: ingredient });
    } else res.status(400).json({ message: "Invalid restaurant ID." });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
