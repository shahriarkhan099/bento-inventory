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
exports.createOrderToRestaurantWithIngredientBatches = exports.removeOrderOfRestaurant = exports.editOrderOfRestaurant = exports.getAllOrderOfRestaurantWithBatch = void 0;
const order_query_1 = require("../models/order/order.query");
function getAllOrderOfRestaurantWithBatch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const order = yield (0, order_query_1.findAllOrderOfRestaurantWithBatch)(restaurantId);
                res.status(200).json({ orders: order });
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
exports.getAllOrderOfRestaurantWithBatch = getAllOrderOfRestaurantWithBatch;
function editOrderOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.orderId);
            if (orderId) {
                let order = req.body;
                if (typeof order.restaurantId === 'number') {
                    const updatedOrder = yield (0, order_query_1.updateOrderOfRestaurant)(orderId, order);
                    res.status(200).json(updatedOrder);
                }
                else
                    res.status(400).json({ message: "Invalid order information." });
            }
            else
                res.status(400).json({ message: "Invalid order ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.editOrderOfRestaurant = editOrderOfRestaurant;
function removeOrderOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.orderId);
            if (orderId) {
                const deletedOrder = yield (0, order_query_1.deleteOrderOfRestaurant)(orderId);
                res.status(200).json(deletedOrder);
            }
            else
                res.status(400).json({ message: "Invalid order ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.removeOrderOfRestaurant = removeOrderOfRestaurant;
function createOrderToRestaurantWithIngredientBatches(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = req.body;
            const ingredientBatches = req.body.ingredientBatches;
            const deliveryBoxBatches = req.body.deliveryBoxBatches;
            const restaurantId = Number(req.params.restaurantId);
            order.restaurantId = restaurantId;
            if (typeof order.restaurantId === 'number') {
                const newOrder = yield (0, order_query_1.addOrderToRestaurantWithIngredientBatches)(order, ingredientBatches, deliveryBoxBatches);
                res.status(201).json(newOrder);
            }
            else
                res.status(400).json({ message: "Invalid order information." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.createOrderToRestaurantWithIngredientBatches = createOrderToRestaurantWithIngredientBatches;
