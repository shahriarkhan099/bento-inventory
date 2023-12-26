import { Router } from 'express';
import { getAllWasteLogWithIngredient, createWasteLog, editWasteLog, searchWasteLog } from '../controllers/wasteLog.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllWasteLogWithIngredient);
router.post('/restaurant/:restaurantId', createWasteLog);
router.put('/restaurant/:wasteLogId', editWasteLog);
router.get('/restaurant/:restaurantId/search', searchWasteLog);

export default router;