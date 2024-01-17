import { Router } from 'express';
import { getAllOrderOfRestaurantWithBatch, editOrderOfRestaurant, removeOrderOfRestaurant, 
    createOrderToRestaurantWithAllBatches, createOrderToRestaurantWithIngredientBatches, 
    createOrderToRestaurantWithDeliveryBoxBatches } from '../controllers/order.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllOrderOfRestaurantWithBatch);
router.put('/restaurant/:orderId', editOrderOfRestaurant);
router.delete('/restaurant/:orderId', removeOrderOfRestaurant);
router.post('/restaurant/:restaurantId/ingredientBatches', createOrderToRestaurantWithIngredientBatches);
router.post('/restaurant/:restaurantId/deliveryBoxBatches', createOrderToRestaurantWithDeliveryBoxBatches);
router.post('/restaurant/:restaurantId/allBatches', createOrderToRestaurantWithAllBatches);

export default router;