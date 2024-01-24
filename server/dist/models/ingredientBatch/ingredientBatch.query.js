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
exports.getTotalAmountOfIngredientThatExpiresInSpecificDate = exports.findIngredientsByCategoryName = exports.findIngredientWithCategory = exports.deleteIngredientOfRestaurant = exports.deductIngredientBatchesInFIFO = exports.updateIngredientOfRestaurant = exports.addIngredientToRestaurant = exports.findAllIngredientOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const ingredientBatch_model_1 = __importDefault(require("./ingredientBatch.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
const consumptionLog_query_1 = require("../consumptionLog/consumptionLog.query");
const __1 = __importDefault(require(".."));
function findAllIngredientOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredientBatch_model_1.default.findAll({
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
            const newIngredient = yield ingredientBatch_model_1.default.create(ingredient);
            return newIngredient;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating ingredient.');
        }
    });
}
exports.addIngredientToRestaurant = addIngredientToRestaurant;
function updateIngredientOfRestaurant(ingredientId, ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedIngredient = yield ingredientBatch_model_1.default.update(ingredient, {
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
function deductIngredientBatchesInFIFO(ingredientId, quantity, orderType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredientBatches = yield ingredientBatch_model_1.default.findAll({
                where: {
                    ingredientId: ingredientId,
                    currentStockQuantity: {
                        [sequelize_1.Op.gt]: 0
                    },
                },
                order: [
                    ['createdAt', 'ASC']
                ]
            });
            let remainingQuantity = quantity;
            for (let i = 0; i < ingredientBatches.length; i++) {
                if (remainingQuantity === 0) {
                    break;
                }
                const ingredientBatch = ingredientBatches[i];
                if (ingredientBatch.currentStockQuantity >= remainingQuantity) {
                    ingredientBatch.currentStockQuantity -= remainingQuantity;
                    remainingQuantity = 0;
                }
                else {
                    remainingQuantity -= ingredientBatch.currentStockQuantity;
                    ingredientBatch.currentStockQuantity = 0;
                }
                yield ingredientBatch.save();
                if (remainingQuantity === 0) {
                    yield (0, consumptionLog_query_1.createConsumptionLogOfRestaurantFromDeduction)({
                        restaurantId: ingredientBatch.restaurantId,
                        itemId: ingredientId,
                        itemType: 'ingredient',
                        quantity: quantity,
                        orderType: orderType,
                        itemName: ingredientBatch.ingredientName,
                        unitOfStock: ingredientBatch.unitOfStock,
                        costPerUnit: ingredientBatch.costPerUnit
                    });
                    console.log('consumption log For Ingredient has created');
                }
            }
            return ingredientBatches;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error deducting ingredient batches.');
        }
    });
}
exports.deductIngredientBatchesInFIFO = deductIngredientBatchesInFIFO;
function deleteIngredientOfRestaurant(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedIngredient = yield ingredientBatch_model_1.default.destroy({
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
            const ingredient = yield ingredientBatch_model_1.default.findAll({
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
            const ingredient = yield ingredientBatch_model_1.default.findAll({
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
function getTotalAmountOfIngredientThatExpiresInSpecificDate(ingredientId, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredientBatches = yield ingredientBatch_model_1.default.findAll({
                attributes: [
                    [__1.default.fn("SUM", __1.default.col("currentStockQuantity")), "totalAmount"],
                ],
                where: {
                    ingredientId: ingredientId,
                    currentStockQuantity: {
                        [sequelize_1.Op.gt]: 0,
                    },
                    expirationDate: {
                        [sequelize_1.Op.lte]: date,
                    },
                },
            });
            const totalAmount = ingredientBatches.length > 0 ? ingredientBatches[0].get('totalAmount') : 0;
            return totalAmount;
        }
        catch (error) {
            throw new Error('Error finding ingredient.');
        }
    });
}
exports.getTotalAmountOfIngredientThatExpiresInSpecificDate = getTotalAmountOfIngredientThatExpiresInSpecificDate;
