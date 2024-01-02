import { Router } from 'express';
import { getAllDeliveryBoxesOfRestaurant, searchDeliveryBoxes, postDeliveryBoxToRestaurant,
         putDeliveryBox, deleteDeliveryBoxOfRestaurant } from '../controllers/deliveryBox.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllDeliveryBoxesOfRestaurant);
router.get('/restaurant/:restaurantId/search', searchDeliveryBoxes);
router.post('/restaurant/:restaurantId', postDeliveryBoxToRestaurant);
router.put('/restaurant/:deliveryBoxId', putDeliveryBox);
router.delete('/restaurant/:deliveryBoxId', deleteDeliveryBoxOfRestaurant);

export default router;