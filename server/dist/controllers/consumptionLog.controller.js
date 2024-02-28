"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSevenMostConsumedIngredients = exports.postConsumptionLogToRestaurantWithOrder = exports.deleteConsumptionLogOfRestaurant = exports.putConsumptionLog = exports.postConsumptionLogToRestaurant = exports.searchConsumptionLogs = exports.getAllConsumptionLogsOfRestaurant = void 0;
const consumptionLog_query_1 = require("../models/consumptionLog/consumptionLog.query");
function getAllConsumptionLogsOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const consumptionLogs = yield (0, consumptionLog_query_1.findAllConsumptionLogsOfRestaurant)(restaurantId);
                res.json({ consumptionLogs: consumptionLogs });
            }
            else
                res.status(400).json({ message: "Invalid restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.getAllConsumptionLogsOfRestaurant = getAllConsumptionLogsOfRestaurant;
function searchConsumptionLogs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const consumptionLogs = yield (0, consumptionLog_query_1.findConsumptionLogsByIngredientName)(restaurantId, searchTerm);
                res.json({ consumptionLogs: consumptionLogs });
            }
            else
                res.json({ consumptionLogs: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchConsumptionLogs = searchConsumptionLogs;
function postConsumptionLogToRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                let consumptionLog = req.body;
                if (typeof consumptionLog.ingredientName === "string") {
                    const newConsumptionLog = yield (0, consumptionLog_query_1.createConsumptionLogOfRestaurant)(consumptionLog, restaurantId);
                    res.status(201).json("Created");
                }
                else {
                    res
                        .status(400)
                        .json({ message: "Invalid consumption log information." });
                }
            }
            else
                res.status(400).json({ message: "Invalid restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.postConsumptionLogToRestaurant = postConsumptionLogToRestaurant;
function putConsumptionLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const consumptionLogId = Number(req.params.consumptionLogId);
            if (consumptionLogId) {
                let consumptionLog = req.body;
                if (typeof consumptionLog.ingredientName === "string") {
                    const updatedConsumptionLog = yield (0, consumptionLog_query_1.updateConsumptionLog)(consumptionLogId, consumptionLog);
                    res.json("Updated");
                }
                else {
                    res
                        .status(400)
                        .json({ message: "Invalid consumption log information." });
                }
            }
            else
                res.status(400).json({ message: "Invalid consumption log ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.putConsumptionLog = putConsumptionLog;
function deleteConsumptionLogOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const consumptionLogId = Number(req.params.consumptionLogId);
            if (consumptionLogId) {
                const deletedConsumptionLog = yield (0, consumptionLog_query_1.deleteConsumptionLog)(consumptionLogId);
                res.json("Deleted");
            }
            else
                res.status(400).json({ message: "Invalid consumption log ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteConsumptionLogOfRestaurant = deleteConsumptionLogOfRestaurant;
function postConsumptionLogToRestaurantWithOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { orderType, restaurantId, ingredientsToReduce, deliveryBoxesToReduce } = req.body;
            // console.log('data that has come from skeleton/kds to minus from inventory', req.body);
            // const orderWithIngredients = { orderType: orderType, restaurantId: restaurantId, ingredientsToReduce: ingredientsToReduce as IngredientToReduce[]};
            // const orderWithDeliveryBoxes = { orderType: orderType, restaurantId: restaurantId, deliveryBoxesToReduce: deliveryBoxesToReduce as DeliveryBoxToReduce[]};
            // console.log('orderWithDeliveryBoxes', orderWithDeliveryBoxes);
            // await deductIngredientsFromOrder(orderWithIngredients);
            // // if (orderWithDeliveryBoxes.deliveryBoxesToReduce.length !== 0) {
            // //   await deductDeliveryBoxesFromOrder(orderWithDeliveryBoxes);
            // // }
            res.status(200).json({ message: "Deducted" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.postConsumptionLogToRestaurantWithOrder = postConsumptionLogToRestaurantWithOrder;
function findSevenMostConsumedIngredients(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const consumptionLogs = yield (0, consumptionLog_query_1.getSevenMostConsumedIngredients)(restaurantId);
                res.json({ consumptionLogs: consumptionLogs });
            }
            else
                res.status(400).json({ message: "Invalid restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.findSevenMostConsumedIngredients = findSevenMostConsumedIngredients;
