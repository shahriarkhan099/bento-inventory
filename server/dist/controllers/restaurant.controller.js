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
exports.searchRestaurant = exports.postRestaurant = exports.getAllRestaurants = void 0;
const restaurant_query_1 = require("../models/restaurant/restaurant.query");
function getAllRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield (0, restaurant_query_1.findAllRestaurants)();
            res.json({ data: restaurants });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.getAllRestaurants = getAllRestaurants;
function postRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, address } = req.body;
            if (name && address && typeof name === 'string' && typeof address === 'string') {
                const restaurant = yield (0, restaurant_query_1.createRestaurant)({ name, address });
                res.status(201).json(restaurant);
            }
            else
                res.status(400).json({ message: 'Invalid restaurant fields.' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.postRestaurant = postRestaurant;
function searchRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const restaurants = yield (0, restaurant_query_1.findRestaurantBySearchTerm)(searchTerm);
                res.json({ data: restaurants });
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
exports.searchRestaurant = searchRestaurant;
