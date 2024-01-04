import { Router } from 'express';
import { getAllConsumptionLogsOfRestaurant, searchConsumptionLogs, postConsumptionLogToRestaurant, putConsumptionLog, deleteConsumptionLogOfRestaurant } from '../controllers/consumptionLog.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllConsumptionLogsOfRestaurant);
router.get('/restaurant/:restaurantId/search', searchConsumptionLogs);
router.post('/restaurant/:restaurantId', postConsumptionLogToRestaurant);
router.put('/restaurant/:consumptionLogId', putConsumptionLog);
router.delete('/restaurant/:consumptionLogId', deleteConsumptionLogOfRestaurant);

export default router;