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
exports.searchFood = exports.postFoodToRestaurant = exports.getAllFoodOfRestaurant = exports.getAllFoodWithRestaurantInfo = void 0;
const food_query_1 = require("../models/food/food.query");
function getAllFoodWithRestaurantInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const food = yield (0, food_query_1.findAllFood)();
            res.json({ data: food });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.getAllFoodWithRestaurantInfo = getAllFoodWithRestaurantInfo;
function getAllFoodOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const restaurantId = Number(id);
            if (id && restaurantId) {
                const food = yield (0, food_query_1.findAllFoodInRestaurant)(restaurantId);
                res.json({ data: food });
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
exports.getAllFoodOfRestaurant = getAllFoodOfRestaurant;
function postFoodToRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const restaurantId = Number(id);
            if (id && restaurantId) {
                const { name, price } = req.body;
                if (typeof name === 'string' && typeof price === 'number') {
                    const food = yield (0, food_query_1.addFoodToRestaurant)(restaurantId, { name, price });
                    res.status(201).json(food);
                }
                else
                    res.status(400).json({ message: "Invalid food information." });
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
exports.postFoodToRestaurant = postFoodToRestaurant;
function searchFood(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const food = yield (0, food_query_1.findFoodBySearchTerm)(searchTerm);
                res.json({ data: food });
            }
            else
                res.json({ data: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchFood = searchFood;
