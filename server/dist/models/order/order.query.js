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
exports.addOrderToRestaurantWithIngredientBatchesAfterFiveHours = exports.addOrderToRestaurantWithIngredientBatchesAfterSixHours = exports.addOrderToRestaurantWithIngredientBatches = exports.deleteOrderOfRestaurant = exports.updateOrderOfRestaurant = exports.addOrderToRestaurant = exports.findAllOrderOfRestaurantWithPendingBatch = exports.findAllOrderOfRestaurantWithBatch = void 0;
const sequelize_1 = require("sequelize");
const order_model_1 = __importDefault(require("./order.model"));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const ingredient_query_1 = require("../ingredient/ingredient.query");
const deliveryBox_query_1 = require("../deliveryBox/deliveryBox.query");
const ingredientBatch_query_1 = require("../ingredientBatch/ingredientBatch.query");
const deliveryBoxBatch_model_1 = __importDefault(require("../deliveryBoxBatch/deliveryBoxBatch.model"));
const deliveryBoxBatch_query_1 = require("../deliveryBoxBatch/deliveryBoxBatch.query");
const axios_1 = __importDefault(require("axios"));
function findAllOrderOfRestaurantWithBatch(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                },
                include: [
                    {
                        model: ingredientBatch_model_1.default,
                    },
                    {
                        model: deliveryBoxBatch_model_1.default,
                    },
                ],
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
function findAllOrderOfRestaurantWithPendingBatch(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                    status: {
                        [sequelize_1.Op.or]: ['pending', 'preparing', 'out_for_delivery', 'cancelled']
                    }
                },
                include: [
                    {
                        model: ingredientBatch_model_1.default,
                    },
                    {
                        model: deliveryBoxBatch_model_1.default,
                    },
                ],
            });
            return order;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error finding order.');
        }
    });
}
exports.findAllOrderOfRestaurantWithPendingBatch = findAllOrderOfRestaurantWithPendingBatch;
function addOrderToRestaurant(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield order_model_1.default.create(order);
            return newOrder;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating order.');
        }
    });
}
exports.addOrderToRestaurant = addOrderToRestaurant;
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
function addOrderToRestaurantWithIngredientBatches(order, ingredientBatches, deliveryBoxBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                order.totalPrice = 0;
                if (ingredientBatches) {
                    ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += ingredientBatch.purchasePrice;
                    }));
                }
                if (deliveryBoxBatches) {
                    deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += deliveryBoxBatch.purchasePrice;
                    }));
                }
                const newOrder = yield addOrderToRestaurant(order);
                if (ingredientBatches) {
                    ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                        ingredientBatch.orderId = newOrder.id;
                        ingredientBatch.restaurantId = newOrder.restaurantId;
                        ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
                        ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
                        const newIngredientBatch = yield (0, ingredientBatch_query_1.addIngredientToRestaurant)(ingredientBatch);
                        yield (0, ingredient_query_1.updateIngredientInfoOfRestaurantWithNewIngredientBatch)(newIngredientBatch);
                    }));
                }
                if (deliveryBoxBatches) {
                    deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                        deliveryBoxBatch.orderId = newOrder.id;
                        deliveryBoxBatch.restaurantId = newOrder.restaurantId;
                        deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
                        deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
                        const newDeliveryBoxBatch = yield (0, deliveryBoxBatch_query_1.addDeliveryBoxToRestaurant)(deliveryBoxBatch);
                        yield (0, deliveryBox_query_1.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch)(newDeliveryBoxBatch);
                    }));
                }
                return newOrder;
            }
            catch (error) {
                console.log(error);
                throw new Error('Error creating order with Batches.');
            }
        }), 20000); // 20 seconds delay
    });
}
exports.addOrderToRestaurantWithIngredientBatches = addOrderToRestaurantWithIngredientBatches;
function addOrderToRestaurantWithIngredientBatchesAfterSixHours(order, ingredientBatches, deliveryBoxBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                order.totalPrice = 0;
                if (ingredientBatches) {
                    ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += ingredientBatch.purchasePrice;
                    }));
                }
                if (deliveryBoxBatches) {
                    deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += deliveryBoxBatch.purchasePrice;
                    }));
                }
                const newOrder = yield addOrderToRestaurant(order);
                if (ingredientBatches) {
                    ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                        ingredientBatch.orderId = newOrder.id;
                        ingredientBatch.restaurantId = newOrder.restaurantId;
                        ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
                        ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
                        const newIngredientBatch = yield (0, ingredientBatch_query_1.addIngredientToRestaurant)(ingredientBatch);
                        yield (0, ingredient_query_1.updateIngredientInfoOfRestaurantWithNewIngredientBatch)(newIngredientBatch);
                    }));
                }
                if (deliveryBoxBatches) {
                    deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                        deliveryBoxBatch.orderId = newOrder.id;
                        deliveryBoxBatch.restaurantId = newOrder.restaurantId;
                        deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
                        deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
                        const newDeliveryBoxBatch = yield (0, deliveryBoxBatch_query_1.addDeliveryBoxToRestaurant)(deliveryBoxBatch);
                        yield (0, deliveryBox_query_1.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch)(newDeliveryBoxBatch);
                    }));
                }
                return newOrder;
            }
            catch (error) {
                console.log(error);
                throw new Error('Error creating order with Batches.');
            }
        }), 6 * 60 * 60 * 1000);
    });
}
exports.addOrderToRestaurantWithIngredientBatchesAfterSixHours = addOrderToRestaurantWithIngredientBatchesAfterSixHours;
function addOrderToRestaurantWithIngredientBatchesAfterFiveHours(order, ingredientBatches, deliveryBoxBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                order.totalPrice = 0;
                if (ingredientBatches) {
                    ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += ingredientBatch.purchasePrice;
                    }));
                }
                if (deliveryBoxBatches) {
                    deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                        order.totalPrice += deliveryBoxBatch.purchasePrice;
                    }));
                }
                // Send request to another API
                const response = yield axios_1.default.post('https://example.com/api', order);
                if (response.status === 200) {
                    const newOrder = yield addOrderToRestaurant(order);
                    if (ingredientBatches) {
                        ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                            ingredientBatch.orderId = newOrder.id;
                            ingredientBatch.restaurantId = newOrder.restaurantId;
                            ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
                            ingredientBatch.costPerUnit = ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity;
                            const newIngredientBatch = yield (0, ingredientBatch_query_1.addIngredientToRestaurant)(ingredientBatch);
                            yield (0, ingredient_query_1.updateIngredientInfoOfRestaurantWithNewIngredientBatch)(newIngredientBatch);
                        }));
                    }
                    if (deliveryBoxBatches) {
                        deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                            deliveryBoxBatch.orderId = newOrder.id;
                            deliveryBoxBatch.restaurantId = newOrder.restaurantId;
                            deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
                            deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
                            const newDeliveryBoxBatch = yield (0, deliveryBoxBatch_query_1.addDeliveryBoxToRestaurant)(deliveryBoxBatch);
                            yield (0, deliveryBox_query_1.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch)(newDeliveryBoxBatch);
                        }));
                    }
                    return newOrder;
                }
                else {
                    throw new Error('Error creating order with Batches.');
                }
            }
            catch (error) {
                console.log(error);
                throw new Error('Error creating order with Batches.');
            }
        }), 5 * 60 * 60 * 1000);
    });
}
exports.addOrderToRestaurantWithIngredientBatchesAfterFiveHours = addOrderToRestaurantWithIngredientBatchesAfterFiveHours;
