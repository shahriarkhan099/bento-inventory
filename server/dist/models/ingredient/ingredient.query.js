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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIngredientsByCategoryName = exports.findIngredientWithCategory = exports.deleteIngredientOfRestaurant = exports.updateIngredientOfRestaurant = exports.findIngredientBySearchTerm = exports.addIngredientToRestaurant = exports.findAllIngredientOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const ingredient_model_1 = __importDefault(require("./ingredient.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
function findAllIngredientOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                }
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error finding ingredients.');
        }
    });
}
exports.findAllIngredientOfRestaurant = findAllIngredientOfRestaurant;
function addIngredientToRestaurant(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            ingredient.costPerUnit = ingredient.purchasePrice / ingredient.currentStockQuantity;
            const newIngredient = yield ingredient_model_1.default.create(ingredient);
            return newIngredient;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating ingredient.');
        }
    });
}
exports.addIngredientToRestaurant = addIngredientToRestaurant;
function findIngredientBySearchTerm(restaurantId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    ingredientName: { [sequelize_1.Op.iLike]: `%${searchTerm}%` },
                    restaurantId: restaurantId
                }
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error searching for ingredient.');
        }
    });
}
exports.findIngredientBySearchTerm = findIngredientBySearchTerm;
function updateIngredientOfRestaurant(ingredientId, ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedIngredient = yield ingredient_model_1.default.update(ingredient, {
                where: {
                    id: ingredientId
                }
            });
            return updatedIngredient;
        }
        catch (error) {
            throw new Error('Error updating ingredient.');
        }
    });
}
exports.updateIngredientOfRestaurant = updateIngredientOfRestaurant;
function deleteIngredientOfRestaurant(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedIngredient = yield ingredient_model_1.default.destroy({
                where: {
                    id: ingredientId
                }
            });
            return deletedIngredient;
        }
        catch (error) {
            throw new Error('Error deleting ingredient.');
        }
    });
}
exports.deleteIngredientOfRestaurant = deleteIngredientOfRestaurant;
function findIngredientWithCategory(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                },
                include: [category_model_1.default]
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error finding ingredient.');
        }
    });
}
exports.findIngredientWithCategory = findIngredientWithCategory;
function findIngredientsByCategoryName(restaurantId, categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                },
                include: [{
                        model: category_model_1.default,
                        where: {
                            categoryName: categoryName
                        }
                    }]
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error finding ingredient.');
        }
    });
}
exports.findIngredientsByCategoryName = findIngredientsByCategoryName;
