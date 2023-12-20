import { Request, Response } from "express";
import { findAllCategoryOfRestaurant, findAllIngredientOfCategoryOfRestaurant, addCategoryToRestaurant, findCategoryBySearchTerm } from "../models/category/category.query";

export async function getAllCategoryOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const category = await findAllCategoryOfRestaurant(restaurantId);
        res.json({ data: category });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function postCategoryToRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const { ingredientId, categoryName, imageUrl, storageShelf, storageType, description, vegetarian, vegan } = req.body;
        if (typeof ingredientId === 'number' && typeof categoryName === 'string') {
          const category = await addCategoryToRestaurant(restaurantId, { ingredientId, categoryName, imageUrl, storageShelf, storageType, description, vegetarian, vegan });
          res.status(201).json(category);
        } else res.status(400).json({ message: "Invalid category information." });
    } else res.status(400).json({ message: "Invalid restaurant ID." });
      
     } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function searchCategory (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      
      const search = req.query.q;
      const searchTerm = search?.toString();
  
      if (searchTerm) {
        const category = await findCategoryBySearchTerm(restaurantId, searchTerm);
        res.json({ data: category });
      } else res.json({ data: [] });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function getAllIngredientOfCategoryOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const categoryId = Number(id);
      let restaurantId = Number(req.params.restaurantId);

      if (id && categoryId) {
        const category = await findAllIngredientOfCategoryOfRestaurant(categoryId, restaurantId);
        res.json({ data: category });
      } else res.status(400).json({ message: "Invalid category ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function postIngredientToCategoryOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const categoryId = Number(id);
      if (id && categoryId) {
        const { ingredientId, categoryName, imageUrl, storageShelf, storageType, description, vegetarian, vegan } = req.body;
        if (typeof ingredientId === 'number' && typeof categoryName === 'string') {
          const category = await addCategoryToRestaurant(categoryId, { ingredientId, categoryName, imageUrl, storageShelf, storageType, description, vegetarian, vegan });
          res.status(201).json(category);
        } else res.status(400).json({ message: "Invalid category information." });
    } else res.status(400).json({ message: "Invalid category ID." });
      
     } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}