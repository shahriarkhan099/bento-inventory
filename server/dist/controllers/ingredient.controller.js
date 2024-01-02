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
exports.getAllIngredientOfRestaurantWithCategoryAndIngredientBatch = exports.getIngredientsByCategoryName = exports.getIngredientWithCategory = exports.deleteIngredient = exports.updateIngredient = exports.searchIngredient = exports.postIngredientToRestaurant = exports.getAllIngredientOfRestaurant = void 0;
const ingredient_query_1 = require("../models/ingredient/ingredient.query");
function getAllIngredientOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const ingredient = yield (0, ingredient_query_1.findAllIngredientOfRestaurant)(restaurantId);
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
                if (restaurantId) {
                    const newIngredient = yield (0, ingredient_query_1.addIngredientToRestaurant)(ingredient);
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
function searchIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const ingredient = yield (0, ingredient_query_1.findIngredientBySearchTerm)(restaurantId, searchTerm);
                res.json({ ingredients: ingredient });
            }
            else
                res.json({ ingredients: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchIngredient = searchIngredient;
function updateIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredientId = Number(req.params.ingredientId);
            if (ingredientId) {
                let ingredient = req.body;
                if (typeof ingredient.ingredientName === 'string' && typeof ingredient.purchasePrice === 'number') {
                    const updatedIngredient = yield (0, ingredient_query_1.updateIngredientOfRestaurant)(ingredientId, ingredient);
                    res.status(200).json("Updated");
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
                const deletedIngredient = yield (0, ingredient_query_1.deleteIngredientOfRestaurant)(ingredientId);
                res.status(200).json("Deleted");
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
                const ingredient = yield (0, ingredient_query_1.findIngredientWithCategory)(restaurantId);
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
                const ingredient = yield (0, ingredient_query_1.findIngredientsByCategoryName)(restaurantId, categoryName);
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
function getAllIngredientOfRestaurantWithCategoryAndIngredientBatch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const ingredient = yield (0, ingredient_query_1.findAllIngredientOfRestaurantWithCategoryAndIngredientBatch)(restaurantId);
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
exports.getAllIngredientOfRestaurantWithCategoryAndIngredientBatch = getAllIngredientOfRestaurantWithCategoryAndIngredientBatch;
