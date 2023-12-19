import { Router } from 'express';
import { getAllIngredientOfRestaurant, postIngredientToRestaurant, searchIngredient } from '../controllers/ingredient.controller';
const router = Router();

router.get('/restaurant/:id', getAllIngredientOfRestaurant);
router.post('/restaurant/:id', postIngredientToRestaurant);
// router.put('/restaurant/:restaurantId/:ingredientId', updateIngredient);
// router.delete('/restaurant/:restaurantId/:ingredientId', deleteIngredient);
router.get('/search', searchIngredient);

export default router;