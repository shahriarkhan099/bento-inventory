import { Router } from 'express';
import { getAllWasteLogWithIngredient, createWasteLog, editWasteLog, searchWasteLog, removeWasteLog, getSevenMostWastedIngredientsForRestaurant } from '../controllers/wasteLog.controller';

const router = Router();

router.get('/restaurant/:restaurantId', getAllWasteLogWithIngredient);
router.post('/restaurant/:restaurantId', createWasteLog);
router.put('/restaurant/:wasteLogId', editWasteLog);
router.get('/restaurant/:restaurantId/search', searchWasteLog);
router.delete("/restaurant/wasteLog/:wasteLogId", removeWasteLog);

// Get seven most wasted ingredients
router.get('/restaurant/:restaurantId/sevenMostWasted', getSevenMostWastedIngredientsForRestaurant);

export default router;