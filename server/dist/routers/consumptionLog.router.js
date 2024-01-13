"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consumptionLog_controller_1 = require("../controllers/consumptionLog.controller");
const router = (0, express_1.Router)();
router.get('/restaurant/:restaurantId', consumptionLog_controller_1.getAllConsumptionLogsOfRestaurant);
router.post('/restaurant/:restaurantId', consumptionLog_controller_1.postConsumptionLogToRestaurant);
router.put('/restaurant/:consumptionLogId', consumptionLog_controller_1.putConsumptionLog);
router.delete('/restaurant/:consumptionLogId', consumptionLog_controller_1.deleteConsumptionLogOfRestaurant);
router.get('/restaurant/:restaurantId/search', consumptionLog_controller_1.searchConsumptionLogs);
//Deduct ingredients from restaurant
router.post('/restaurant/:restaurantId/deduct', consumptionLog_controller_1.postConsumptionLogToRestaurantWithOrder);
exports.default = router;
