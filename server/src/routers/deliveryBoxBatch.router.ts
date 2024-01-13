import { Router } from 'express';
import { getAllDeliveryBoxOfRestaurant, addDeliveryBoxToRestaurantWithBatch, updateDeliveryBox,
    deleteDeliveryBox, searchDeliveryBox } from '../controllers/deliveryBoxBatch.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllDeliveryBoxOfRestaurant);
router.post('/restaurant/:restaurantId', addDeliveryBoxToRestaurantWithBatch);
router.put('/restaurant/:deliveryBoxId', updateDeliveryBox);
router.delete('/restaurant/:deliveryBoxId', deleteDeliveryBox);
router.get('/restaurant/:restaurantId/search', searchDeliveryBox);

export default router;