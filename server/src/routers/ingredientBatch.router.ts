import { Router } from 'express';
import { getAllIngredientOfRestaurant, postIngredientToRestaurant, updateIngredient, 
    deleteIngredient, getIngredientWithCategory, getIngredientsByCategoryName } from '../controllers/ingredientBatch.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = Router();

router.get('/restaurant', authMiddleware, getAllIngredientOfRestaurant);
router.post('/restaurant/:restaurantId', postIngredientToRestaurant);
router.put('/restaurant/:ingredientId', updateIngredient);
router.delete('/restaurant/:ingredientId', deleteIngredient);
router.get('/restaurant/:restaurantId/ingredients/categories', getIngredientWithCategory);
router.get('/restaurant/:restaurantId/ingredients/categories/:categoryName', getIngredientsByCategoryName);

export default router;