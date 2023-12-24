import { Router } from 'express';
import { getAllCategoryOfRestaurant, postCategoryToRestaurant, searchCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllCategoryOfRestaurant);
router.post('/restaurant/:restaurantId', postCategoryToRestaurant);
router.get('/restaurant/:restaurantId/categories/search', searchCategory);
router.put('/restaurant/:categoryId', updateCategory);
router.delete('/restaurant/:categoryId', deleteCategory);

export default router;
