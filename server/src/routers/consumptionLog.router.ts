import { Router } from 'express';
import { getAllConsumptionLogsOfRestaurant, searchConsumptionLogs, postConsumptionLogToRestaurant, putConsumptionLog, deleteConsumptionLogOfRestaurant } from '../controllers/consumptionLog.controller';
const router = Router();

router.get('/:restaurantId', getAllConsumptionLogsOfRestaurant);
router.get('/:restaurantId/search', searchConsumptionLogs);
router.post('/:restaurantId', postConsumptionLogToRestaurant);
router.put('/:consumptionLogId', putConsumptionLog);
router.delete('/:consumptionLogId', deleteConsumptionLogOfRestaurant);

export default router;