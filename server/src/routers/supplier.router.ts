import { Router } from 'express';
import { getAllSuppliers, createSupplier, editSupplier, searchSupplier, deleteSupplierById, getSupplierByLabel } from '../controllers/supplier.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAllSuppliers);
router.post('/restaurant/:restaurantId', createSupplier);
router.put('/restaurant/:supplierId', editSupplier);
router.delete('/restaurant/:supplierId', deleteSupplierById);
router.get('/restaurant/:restaurantId/search', searchSupplier);
router.get('/restaurant/:restaurantId/label/:label', getSupplierByLabel);

export default router;