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
exports.deleteOrderOfRestaurant = exports.updateOrderOfRestaurant = exports.addOrderToRestaurantWithIngredientBatches = exports.findAllOrderOfRestaurantWithBatch = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const ingredient_query_1 = require("../ingredient/ingredient.query");
function findAllOrderOfRestaurantWithBatch(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                },
                include: [{
                        model: ingredientBatch_model_1.default
                    }]
            });
            return order;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error finding order.');
        }
    });
}
exports.findAllOrderOfRestaurantWithBatch = findAllOrderOfRestaurantWithBatch;
function addOrderToRestaurantWithIngredientBatches(order, ingredientBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield order_model_1.default.create(order);
            ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                ingredientBatch.orderId = newOrder.id;
                ingredientBatch.restaurantId = newOrder.restaurantId;
                ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
                ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
                ingredientBatch.receivedAt = new Date();
                const newIngredientBatch = yield ingredientBatch_model_1.default.create(ingredientBatch);
                (0, ingredient_query_1.updateIngredientInfoOfRestaurantWithNewIngredientBatch)(newIngredientBatch);
            }));
            return newOrder;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating order.');
        }
    });
}
exports.addOrderToRestaurantWithIngredientBatches = addOrderToRestaurantWithIngredientBatches;
function updateOrderOfRestaurant(orderId, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield order_model_1.default.update(order, {
                where: {
                    id: orderId
                }
            });
            return updatedOrder;
        }
        catch (error) {
            throw new Error('Error updating order.');
        }
    });
}
exports.updateOrderOfRestaurant = updateOrderOfRestaurant;
function deleteOrderOfRestaurant(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield order_model_1.default.destroy({
                where: {
                    id: orderId
                }
            });
            return deletedOrder;
        }
        catch (error) {
            throw new Error('Error deleting order.');
        }
    });
}
exports.deleteOrderOfRestaurant = deleteOrderOfRestaurant;
