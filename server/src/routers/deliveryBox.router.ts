import { Router } from 'express';
import { getAllDeliveryBoxesOfRestaurant, searchDeliveryBoxes, postDeliveryBoxToRestaurant,
         putDeliveryBox, deleteDeliveryBoxOfRestaurant } from '../controllers/deliveryBox.controller';
const router = Router();

router.get('/:restaurantId', getAllDeliveryBoxesOfRestaurant);
router.get('/:restaurantId/search', searchDeliveryBoxes);
router.post('/:restaurantId', postDeliveryBoxToRestaurant);
router.put('/:deliveryBoxId', putDeliveryBox);
router.delete('/:deliveryBoxId', deleteDeliveryBoxOfRestaurant);

export default router;