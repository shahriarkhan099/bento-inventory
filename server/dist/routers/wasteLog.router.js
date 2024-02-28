"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wasteLog_controller_1 = require("../controllers/wasteLog.controller");
const router = (0, express_1.Router)();
router.get('/restaurant/:restaurantId', wasteLog_controller_1.getAllWasteLogWithIngredient);
router.post('/restaurant/:restaurantId', wasteLog_controller_1.createWasteLog);
router.put('/restaurant/:wasteLogId', wasteLog_controller_1.editWasteLog);
router.get('/restaurant/:restaurantId/search', wasteLog_controller_1.searchWasteLog);
router.delete("/restaurant/wasteLog/:wasteLogId", wasteLog_controller_1.removeWasteLog);
// Get seven most wasted ingredients
router.get('/restaurant/:restaurantId/sevenMostWasted', wasteLog_controller_1.getSevenMostWastedIngredientsForRestaurant);
exports.default = router;
