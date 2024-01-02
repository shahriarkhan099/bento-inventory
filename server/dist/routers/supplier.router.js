"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = require("../controllers/supplier.controller");
const router = (0, express_1.Router)();
router.get('/restaurant/:restaurantId', supplier_controller_1.getAllSuppliers);
router.post('/restaurant/:restaurantId', supplier_controller_1.createSupplier);
router.put('/restaurant/:supplierId', supplier_controller_1.editSupplier);
router.delete('/restaurant/supplier/:supplierId', supplier_controller_1.deleteSupplierById);
router.get('/restaurant/:restaurantId/search', supplier_controller_1.searchSupplier);
router.get('/restaurant/:restaurantId/label/:label', supplier_controller_1.getSupplierByLabel);
exports.default = router;