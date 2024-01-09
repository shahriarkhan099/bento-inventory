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
exports.findAllIngredientOfRestaurantWithCategoryAndIngredientBatch = exports.findIngredientsByCategoryName = exports.findIngredientsByIngredientName = exports.findIngredientWithCategory = exports.deleteIngredientOfRestaurant = exports.updateIngredientInfoOfRestaurantWithNewIngredientBatch = exports.updateCurrentStockQuantityOfIngredient = exports.updateIngredientOfRestaurant = exports.findIngredientBySearchTerm = exports.addIngredientToRestaurant = exports.findOneIngredientOfRestaurant = exports.findAllIngredientOfRestaurant = exports.deductIngredientsFromOrder = exports.findIngredientbyId = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const ingredient_model_1 = __importDefault(require("./ingredient.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const ingredientBatch_query_1 = require("../ingredientBatch/ingredientBatch.query");
function findIngredientbyId(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findOne({
                where: {
                    id: ingredientId,
                },
                include: [category_model_1.default],
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findIngredientbyId = findIngredientbyId;
function deductIngredientsFromOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderType, ingredientsToReduce, restaurantId } = order;
        try {
            const deductedIngredients = [];
            for (const ingredientToReduce of ingredientsToReduce) {
                const { id, quantity } = ingredientToReduce;
                const ingredient = yield ingredient_model_1.default.findOne({
                    where: {
                        id: id,
                        restaurantId: restaurantId,
                    },
                });
                if (ingredient) {
                    const deductedBatches = yield (0, ingredientBatch_query_1.deductIngredientBatchesInFIFO)(ingredient.id, quantity, orderType);
                    updateCurrentStockQuantityOfIngredient(ingredient.id);
                    deductedIngredients.push({
                        ingredientId: ingredient.id,
                        deductedBatches: deductedBatches,
                    });
                }
                else {
                    throw new Error(`Ingredient with ID ${id} not found.`);
                }
            }
            return deductedIngredients;
        }
        catch (error) {
            throw new Error(`Error deducting ingredients: ${error}`);
        }
    });
}
exports.deductIngredientsFromOrder = deductIngredientsFromOrder;
function findAllIngredientOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findAllIngredientOfRestaurant = findAllIngredientOfRestaurant;
function findOneIngredientOfRestaurant(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findOne({
                where: {
                    id: ingredientId,
                },
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findOneIngredientOfRestaurant = findOneIngredientOfRestaurant;
function addIngredientToRestaurant(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newIngredient = yield ingredient_model_1.default.create(ingredient);
            return newIngredient;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating global ingredient.");
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
                    restaurantId: restaurantId,
                },
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error searching for global ingredient.");
        }
    });
}
exports.findIngredientBySearchTerm = findIngredientBySearchTerm;
function updateIngredientOfRestaurant(ingredientId, ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedIngredient = yield ingredient_model_1.default.update(ingredient, {
                where: {
                    id: ingredientId,
                },
            });
            return updatedIngredient;
        }
        catch (error) {
            throw new Error("Error updating global ingredient.");
        }
    });
}
exports.updateIngredientOfRestaurant = updateIngredientOfRestaurant;
function updateCurrentStockQuantityOfIngredient(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield findOneIngredientOfRestaurant(ingredientId);
            let updatedIngredient;
            if (ingredient) {
                let totalStockQuantity = yield ingredientBatch_model_1.default.sum("currentStockQuantity", {
                    where: {
                        currentStockQuantity: {
                            [sequelize_1.Op.ne]: 0,
                        },
                        ingredientId: ingredient.id,
                    },
                });
                if (!totalStockQuantity) {
                    totalStockQuantity = 0;
                }
                updatedIngredient = yield ingredient_model_1.default.update({
                    currentStockQuantity: totalStockQuantity,
                }, {
                    where: {
                        id: ingredient.id,
                    },
                });
            }
            else {
                throw new Error('Ingredient not found.');
            }
            return updatedIngredient;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating global ingredient.");
        }
    });
}
exports.updateCurrentStockQuantityOfIngredient = updateCurrentStockQuantityOfIngredient;
function updateIngredientInfoOfRestaurantWithNewIngredientBatch(ingredientBatch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield findOneIngredientOfRestaurant(ingredientBatch.ingredientId);
            let updatedIngredient;
            if (ingredient) {
                updateCurrentStockQuantityOfIngredient(ingredient.id);
                const averageCostPerUnit = yield ingredientBatch_model_1.default.findOne({
                    attributes: [
                        [index_1.default.fn("AVG", index_1.default.col("costPerUnit")), "costPerUnit"],
                    ],
                    where: {
                        ingredientId: ingredient.id,
                        receivedAt: {
                            [sequelize_1.Op.gte]: index_1.default.literal("NOW() - INTERVAL '1 YEAR'"),
                        },
                    },
                });
                updatedIngredient = yield ingredient_model_1.default.update({
                    costPerUnit: averageCostPerUnit
                        ? averageCostPerUnit.dataValues.costPerUnit
                        : 0,
                }, {
                    where: {
                        id: ingredientBatch.ingredientId,
                    },
                });
            }
            else {
                throw new Error("Ingredient not found.");
            }
            return updatedIngredient;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating global ingredient.");
        }
    });
}
exports.updateIngredientInfoOfRestaurantWithNewIngredientBatch = updateIngredientInfoOfRestaurantWithNewIngredientBatch;
function deleteIngredientOfRestaurant(ingredientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedIngredient = yield ingredient_model_1.default.destroy({
                where: {
                    id: ingredientId,
                },
            });
            return deletedIngredient;
        }
        catch (error) {
            throw new Error("Error deleting global ingredient.");
        }
    });
}
exports.deleteIngredientOfRestaurant = deleteIngredientOfRestaurant;
function findIngredientWithCategory(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
                include: [category_model_1.default],
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findIngredientWithCategory = findIngredientWithCategory;
function findIngredientsByIngredientName(restaurantId, ingredientName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    ingredientName: ingredientName,
                    restaurantId: restaurantId,
                },
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findIngredientsByIngredientName = findIngredientsByIngredientName;
function findIngredientsByCategoryName(restaurantId, categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
                include: [
                    {
                        model: category_model_1.default,
                        where: {
                            categoryName: categoryName,
                        },
                    },
                ],
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findIngredientsByCategoryName = findIngredientsByCategoryName;
function findAllIngredientOfRestaurantWithCategoryAndIngredientBatch(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
                include: [
                    {
                        model: category_model_1.default,
                    },
                    {
                        model: ingredientBatch_model_1.default,
                    },
                ],
            });
            return ingredient;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findAllIngredientOfRestaurantWithCategoryAndIngredientBatch = findAllIngredientOfRestaurantWithCategoryAndIngredientBatch;
