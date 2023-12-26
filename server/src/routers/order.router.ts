import { Router } from 'express';
import { getAllOrderOfRestaurant, createOrderToRestaurant, editOrderOfRestaurant, removeOrderOfRestaurant } from '../controllers/order.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllOrderOfRestaurant);
router.post('/restaurant/:restaurantId', createOrderToRestaurant);
router.put('/restaurant/:orderId', editOrderOfRestaurant);
router.delete('/restaurant/:orderId', removeOrderOfRestaurant);

export default router;