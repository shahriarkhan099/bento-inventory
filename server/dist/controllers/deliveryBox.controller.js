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
exports.deductDeliveryBoxesFromOrderOfRestaurant = exports.deleteDeliveryBoxOfRestaurant = exports.putDeliveryBox = exports.postDeliveryBoxToRestaurant = exports.searchDeliveryBoxes = exports.getAllDeliveryBoxesOfRestaurant = void 0;
const deliveryBox_query_1 = require("../models/deliveryBox/deliveryBox.query");
function getAllDeliveryBoxesOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const deliveryBoxes = yield (0, deliveryBox_query_1.findAllDeliveryBoxesOfRestaurant)(restaurantId);
                res.json({ deliveryBoxes: deliveryBoxes });
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
exports.getAllDeliveryBoxesOfRestaurant = getAllDeliveryBoxesOfRestaurant;
function searchDeliveryBoxes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const deliveryBoxes = yield (0, deliveryBox_query_1.findDeliveryBoxesByBoxName)(restaurantId, searchTerm);
                res.json({ deliveryBoxes: deliveryBoxes });
            }
            else
                res.json({ deliveryBoxes: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchDeliveryBoxes = searchDeliveryBoxes;
function postDeliveryBoxToRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                let deliveryBox = req.body;
                if (typeof deliveryBox.boxName === "string") {
                    const newDeliveryBox = yield (0, deliveryBox_query_1.createDeliveryBoxOfRestaurant)(deliveryBox, restaurantId);
                    res.status(201).json("Created");
                }
                else {
                    res.status(400).json({ message: "Invalid delivery box information." });
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
exports.postDeliveryBoxToRestaurant = postDeliveryBoxToRestaurant;
function putDeliveryBox(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBoxId = Number(req.params.deliveryBoxId);
            if (deliveryBoxId) {
                let deliveryBox = req.body;
                if (typeof deliveryBox.boxName === "string") {
                    const updatedDeliveryBox = yield (0, deliveryBox_query_1.updateDeliveryBox)(deliveryBoxId, deliveryBox);
                    res.status(200).json("Updated");
                }
                else {
                    res.status(400).json({ message: "Invalid delivery box information." });
                }
            }
            else
                res.status(400).json({ message: "Invalid delivery box ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.putDeliveryBox = putDeliveryBox;
function deleteDeliveryBoxOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBoxId = Number(req.params.deliveryBoxId);
            if (deliveryBoxId) {
                const deletedDeliveryBox = yield (0, deliveryBox_query_1.deleteDeliveryBox)(deliveryBoxId);
                res.status(200).json("Deleted");
            }
            else
                res.status(400).json({ message: "Invalid delivery box ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteDeliveryBoxOfRestaurant = deleteDeliveryBoxOfRestaurant;
function deductDeliveryBoxesFromOrderOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderType, restaurantId, deliveryBoxesToReduce } = req.body;
            if (!restaurantId || !deliveryBoxesToReduce) {
                res.status(400).json({ error: "Missing required parameters" });
                return;
            }
            const order = {
                orderType: orderType,
                restaurantId: restaurantId,
                deliveryBoxesToReduce: deliveryBoxesToReduce,
            };
            const updatedDeliveryBoxes = yield (0, deliveryBox_query_1.deductDeliveryBoxesFromOrder)(order);
            res.status(200).json(updatedDeliveryBoxes);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deductDeliveryBoxesFromOrderOfRestaurant = deductDeliveryBoxesFromOrderOfRestaurant;
