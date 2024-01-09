import { Router } from 'express';
import { getAllIngredientOfRestaurant, postIngredientToRestaurant, searchIngredient, 
    updateIngredient, deleteIngredient, getIngredientWithCategory, getIngredientsByCategoryName,
    getAllIngredientOfRestaurantWithCategoryAndIngredientBatch, deductIngredientsController, getIngredientbyId  } from '../controllers/ingredient.controller';

const router = Router();

router.get('/restaurant/:restaurantId', getAllIngredientOfRestaurant);
router.post('/restaurant/:restaurantId', postIngredientToRestaurant);
router.put('/restaurant/ingredients/:ingredientId', updateIngredient);
router.delete('/restaurant/ingredients/:ingredientId', deleteIngredient);
router.get('/restaurant/:restaurantId/ingredients/search', searchIngredient);
router.get('/restaurant/:restaurantId/ingredients/categories', getIngredientWithCategory);
router.get('/restaurant/:restaurantId/ingredients/categories/:categoryName', getIngredientsByCategoryName);
router.get('/restaurant/:restaurantId/ingredients', getAllIngredientOfRestaurantWithCategoryAndIngredientBatch);
router.post('/restaurant/:restaurantId/deductIngredients', deductIngredientsController);
router.get('/restaurant/ingredients/:ingredientId', getIngredientbyId);

export default router;