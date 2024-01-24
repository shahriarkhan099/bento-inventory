import { Router } from 'express';
import { getAllIngredientOfRestaurant, postIngredientToRestaurant, searchIngredient, 
    updateIngredient, deleteIngredient, getIngredientWithCategory, getIngredientsByCategoryName,
    getAllIngredientOfRestaurantWithCategoryAndIngredientBatch, deductIngredientsController, 
    getIngredientbyId, getIngredientByIngredientUniqueId  } from '../controllers/ingredient.controller';

const router = Router();

router.get('/restaurant/:restaurantId', getAllIngredientOfRestaurant);
router.post('/restaurant/:restaurantId', postIngredientToRestaurant);
router.put('/restaurant/:ingredientId', updateIngredient);
router.delete('/restaurant/:ingredientId', deleteIngredient);
router.get('/restaurant/:restaurantId/search', searchIngredient);

// get all ingredients of a restaurant with categories
router.get('/restaurant/:restaurantId/ingredients/categories', getIngredientWithCategory);

router.get('/restaurant/:restaurantId/ingredients/categories/:categoryName', getIngredientsByCategoryName);
router.get('/restaurant/:restaurantId/ingredients', getAllIngredientOfRestaurantWithCategoryAndIngredientBatch);
router.get('/restaurant/ingredients/:ingredientId', getIngredientbyId);
router.post('/restaurant/:restaurantId/deductIngredients', deductIngredientsController);

router.get('/restaurant/:restaurantId/:ingredientUniqueId', getIngredientByIngredientUniqueId);

export default router;