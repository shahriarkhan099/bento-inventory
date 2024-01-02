import { Router } from 'express';
import { getAllOrderOfRestaurantWithBatch, editOrderOfRestaurant, removeOrderOfRestaurant, createOrderToRestaurantWithIngredientBatches } from '../controllers/order.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllOrderOfRestaurantWithBatch);
router.post('/restaurant/:restaurantId', createOrderToRestaurantWithIngredientBatches);
router.put('/restaurant/:orderId', editOrderOfRestaurant);
router.delete('/restaurant/:orderId', removeOrderOfRestaurant);

export default router;