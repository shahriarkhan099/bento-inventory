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
exports.getIngredientsByCategoryName = exports.getIngredientWithCategory = exports.deleteIngredient = exports.updateIngredient = exports.postIngredientToRestaurant = exports.getAllIngredientOfRestaurant = void 0;
const ingredientBatch_query_1 = require("../models/ingredientBatch/ingredientBatch.query");
function getAllIngredientOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const ingredient = yield (0, ingredientBatch_query_1.findAllIngredientOfRestaurant)(restaurantId);
                res.json({ ingredients: ingredient });
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
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                let ingredient = req.body;
                ingredient.restaurantId = restaurantId;
                ingredient.currentStockQuantity = ingredient.purchaseQuantity;
                ingredient.costPerUnit = ingredient.purchasePrice / ingredient.purchaseQuantity;
                if (typeof ingredient.ingredientName === 'string' && typeof ingredient.purchasePrice === 'number') {
                    const newIngredient = yield (0, ingredientBatch_query_1.addIngredientToRestaurant)(ingredient);
                    res.status(201).json("Created");
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
function updateIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredientId = Number(req.params.ingredientId);
            if (ingredientId) {
                let ingredient = req.body;
                if (typeof ingredient.ingredientName === 'string' && typeof ingredient.purchasePrice === 'number') {
                    const updatedIngredient = yield (0, ingredientBatch_query_1.updateIngredientOfRestaurant)(ingredientId, ingredient);
                    res.status(200).json(updatedIngredient);
                }
                else
                    res.status(400).json({ message: "Invalid ingredient information." });
            }
            else
                res.status(400).json({ message: "Invalid ingredient ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.updateIngredient = updateIngredient;
function deleteIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredientId = Number(req.params.ingredientId);
            if (ingredientId) {
                const deletedIngredient = yield (0, ingredientBatch_query_1.deleteIngredientOfRestaurant)(ingredientId);
                res.status(200).json(deletedIngredient);
            }
            else
                res.status(400).json({ message: "Invalid ingredient ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteIngredient = deleteIngredient;
function getIngredientWithCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const ingredient = yield (0, ingredientBatch_query_1.findIngredientWithCategory)(restaurantId);
                res.json({ ingredients: ingredient });
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
exports.getIngredientWithCategory = getIngredientWithCategory;
function getIngredientsByCategoryName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const categoryName = req.params.categoryName;
            if (restaurantId) {
                const ingredient = yield (0, ingredientBatch_query_1.findIngredientsByCategoryName)(restaurantId, categoryName);
                res.json({ ingredients: ingredient });
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
exports.getIngredientsByCategoryName = getIngredientsByCategoryName;
