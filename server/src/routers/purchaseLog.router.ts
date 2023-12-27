import { Router } from 'express';
import { getAllPurchaseLogsOfRestaurant, postPurchaseLogToRestaurant, putPurchaseLog, deletePurchaseLogById, 
         getPurchaseLogsWithSupplierAndIngredient, searchPurchaseLogsWithSupplier } from '../controllers/purchaseLog.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllPurchaseLogsOfRestaurant);
router.post('/restaurant/:restaurantId', postPurchaseLogToRestaurant);
router.put('/restaurant/:purchaseLogId', putPurchaseLog);
router.delete('/restaurant/:purchaseLogId', deletePurchaseLogById);
router.get('/restaurant/:restaurantId/supplier/:supplierId', getPurchaseLogsWithSupplierAndIngredient);
router.get('/restaurant/:restaurantId/supplier', searchPurchaseLogsWithSupplier);

export default router;