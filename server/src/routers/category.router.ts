import { Router } from 'express';
import { getAllCategoryOfRestaurant, postCategoryToRestaurant, searchCategory, getAllIngredientOfCategoryOfRestaurant } from '../controllers/category.controller';
const router = Router();

router.get('/restaurant/:id', getAllCategoryOfRestaurant);
router.post('/restaurant/:id', postCategoryToRestaurant);
router.get('/restaurant/:restaurantId/:id', getAllIngredientOfCategoryOfRestaurant);
router.get('/search', searchCategory);
