import { Router } from 'express';
import { getAllCategoryOfRestaurant, postCategoryToRestaurant, searchCategory } from '../controllers/category.controller';
const router = Router();

router.get('/:restaurantId', getAllCategoryOfRestaurant);
router.post('/:restaurantId', postCategoryToRestaurant);
// router.get('/restaurant/:restaurantId/:categoryId', getAllIngredientOfCategoryOfRestaurant);
router.get('/search', searchCategory);

export default router;