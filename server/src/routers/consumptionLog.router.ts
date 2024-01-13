import { Router } from 'express';
import { getAllConsumptionLogsOfRestaurant, searchConsumptionLogs, postConsumptionLogToRestaurant, 
    postConsumptionLogToRestaurantWithOrder, putConsumptionLog, deleteConsumptionLogOfRestaurant } from '../controllers/consumptionLog.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllConsumptionLogsOfRestaurant);
router.post('/restaurant/:restaurantId', postConsumptionLogToRestaurant);
router.put('/restaurant/:consumptionLogId', putConsumptionLog);
router.delete('/restaurant/:consumptionLogId', deleteConsumptionLogOfRestaurant);
router.get('/restaurant/:restaurantId/search', searchConsumptionLogs);

//Deduct ingredients from restaurant
router.post('/restaurant/:restaurantId/deduct', postConsumptionLogToRestaurantWithOrder);

export default router;