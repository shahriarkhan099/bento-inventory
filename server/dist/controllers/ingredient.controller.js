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
exports.searchIngredient = exports.postIngredientToRestaurant = exports.getAllIngredientOfRestaurant = void 0;
const ingredient_query_1 = require("../models/ingredient/ingredient.query");
function getAllIngredientOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const restaurantId = Number(id);
            if (id && restaurantId) {
                const ingredient = yield (0, ingredient_query_1.findAllIngredientOfRestaurant)(restaurantId);
                res.json({ data: ingredient });
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
exports.getAllIngredientOfRestaurant = getAllIngredientOfRestaurant;
function postIngredientToRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const restaurantId = Number(id);
            if (id && restaurantId) {
                const { name, unit, stockQuantity, purchasePrice, costPerUnit, caloriesPerUnit, expirationDate, reorderPoint, description, imageUrl, idealStoringTemperature } = req.body;
                if (typeof name === 'string' && typeof purchasePrice === 'number') {
                    const ingredient = yield (0, ingredient_query_1.addIngredientToRestaurant)(restaurantId, { name, unit, stockQuantity, purchasePrice, costPerUnit, caloriesPerUnit, expirationDate, reorderPoint, description, imageUrl, idealStoringTemperature });
                    res.status(201).json(ingredient);
                }
                else
                    res.status(400).json({ message: "Invalid ingredient information." });
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
exports.postIngredientToRestaurant = postIngredientToRestaurant;
function searchIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const ingredient = yield (0, ingredient_query_1.findIngredientBySearchTerm)(searchTerm);
                res.json({ data: ingredient });
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
exports.searchIngredient = searchIngredient;
