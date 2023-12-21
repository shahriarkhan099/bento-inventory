import { Router } from 'express';
import { getAllIngredientOfRestaurant, postIngredientToRestaurant, searchIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredient.controller';
const router = Router();

router.get('/:restaurantId', getAllIngredientOfRestaurant);
router.post('/:restaurantId', postIngredientToRestaurant);
router.put('/ingredientId', updateIngredient);
router.delete('/ingredientId', deleteIngredient);
router.get('/search', searchIngredient);

export default router;