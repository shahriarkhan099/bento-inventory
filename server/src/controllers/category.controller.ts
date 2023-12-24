import { Request, Response } from "express";
import { findAllCategoryOfRestaurant, addCategoryToRestaurant, findCategoryBySearchTerm, updateCategoryOfRestaurant, deleteCategoryOfRestaurant } from "../models/category/category.query";

export async function getAllCategoryOfRestaurant (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      if (restaurantId) {
        const category = await findAllCategoryOfRestaurant(restaurantId);
        res.json({ categories: category });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function postCategoryToRestaurant (req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      let category = req.body;
      category.restaurantId = restaurantId;
      if (typeof category.categoryName === 'string') {
        const newCategpry = await addCategoryToRestaurant(category);
        res.status(201).json("Created");
      } else {
        res.status(400).json({ message: "Invalid category information." });
      }
  } else res.status(400).json({ message: "Invalid restaurant ID." });
    
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function searchCategory (req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      
      const search = req.query.q;
      const searchTerm = search?.toString();
  
      if (searchTerm) {
        const categories = await findCategoryBySearchTerm(restaurantId, searchTerm);
        res.json({ categories: categories });
      } else res.json({ categories: [] });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function updateCategory (req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      if (categoryId) {
        let category = req.body;
        if (typeof category.categoryName === 'string') {
          const updatedCategory = await updateCategoryOfRestaurant(categoryId, category);
          res.status(200).json(updatedCategory);
        } else res.status(400).json({ message: "Invalid category information." });
      } else res.status(400).json({ message: "Invalid category ID." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}

export async function deleteCategory (req: Request, res: Response) {
    try {
      const categoryId = Number(req.params.categoryId);
      if (categoryId) {
        const deletedCategory = await deleteCategoryOfRestaurant(categoryId);
        res.status(200).json(deletedCategory);
      } else res.status(400).json({ message: "Invalid category ID." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}