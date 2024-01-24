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
exports.sendAutoPilotOrderToVendor = exports.addSupplierIfNoExists = exports.addOrderToRestaurantWithAllBatches = exports.addOrderToRestaurantWithDeliveryBoxBatches = exports.addOrderToRestaurantWithIngredientBatches = exports.deleteOrderOfRestaurant = exports.updateOrderOfRestaurant = exports.addOrderToRestaurant = exports.findAllOrderOfRestaurantWithPendingBatch = exports.findAllOrderOfRestaurantWithBatch = void 0;
const sequelize_1 = require("sequelize");
const order_model_1 = __importDefault(require("./order.model"));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const ingredient_query_1 = require("../ingredient/ingredient.query");
const deliveryBox_query_1 = require("../deliveryBox/deliveryBox.query");
const ingredientBatch_query_1 = require("../ingredientBatch/ingredientBatch.query");
const deliveryBoxBatch_model_1 = __importDefault(require("../deliveryBoxBatch/deliveryBoxBatch.model"));
const deliveryBoxBatch_query_1 = require("../deliveryBoxBatch/deliveryBoxBatch.query");
const supplier_model_1 = __importDefault(require("../supplier/supplier.model"));
const axios_1 = __importDefault(require("axios"));
const supplier_query_1 = require("../supplier/supplier.query");
const config_1 = __importDefault(require("../../config"));
function findAllOrderOfRestaurantWithBatch(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
                include: [
                    {
                        model: ingredientBatch_model_1.default,
                    },
                    {
                        model: deliveryBoxBatch_model_1.default,
                    },
                    {
                        model: supplier_model_1.default,
                    }
                ],
            });
            return order;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding order.");
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
                        [sequelize_1.Op.or]: ["pending", "preparing", "out_for_delivery", "cancelled"],
                    },
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
            throw new Error("Error finding order.");
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
            throw new Error("Error creating order.");
        }
    });
}
exports.addOrderToRestaurant = addOrderToRestaurant;
function updateOrderOfRestaurant(orderId, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield order_model_1.default.update(order, {
                where: {
                    id: orderId,
                },
            });
            return updatedOrder;
        }
        catch (error) {
            throw new Error("Error updating order.");
        }
    });
}
exports.updateOrderOfRestaurant = updateOrderOfRestaurant;
function deleteOrderOfRestaurant(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield order_model_1.default.destroy({
                where: {
                    id: orderId,
                },
            });
            return deletedOrder;
        }
        catch (error) {
            throw new Error("Error deleting order.");
        }
    });
}
exports.deleteOrderOfRestaurant = deleteOrderOfRestaurant;
// create vendor if not exists
function addOrderToRestaurantWithIngredientBatches(order, ingredientBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            order.totalPrice = 0;
            order.status = "delivered";
            if (ingredientBatches) {
                ingredientBatches.forEach((ingredientBatch) => __awaiter(this, void 0, void 0, function* () {
                    order.totalPrice += ingredientBatch.purchasePrice;
                }));
            }
            // create vendor if not exists
            if (order.supplierId) {
                const supplier = yield supplier_model_1.default.findOne({
                    where: {
                        vendorId: order.supplierId,
                    },
                });
                if (!supplier) {
                    const newSupplier = yield addSupplierIfNoExists(order);
                    order.supplierId = newSupplier.id;
                }
            }
            const newOrder = yield addOrderToRestaurant(order);
            if (ingredientBatches) {
                yield processIngredientBatches(ingredientBatches, newOrder);
            }
            return newOrder;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating order with Ingredient Batches.");
        }
    });
}
exports.addOrderToRestaurantWithIngredientBatches = addOrderToRestaurantWithIngredientBatches;
// create vendor if not exists
function addOrderToRestaurantWithDeliveryBoxBatches(order, deliveryBoxBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            order.totalPrice = 0;
            order.status = "delivered";
            if (deliveryBoxBatches) {
                deliveryBoxBatches.forEach((deliveryBoxBatch) => __awaiter(this, void 0, void 0, function* () {
                    order.totalPrice += deliveryBoxBatch.purchasePrice;
                }));
            }
            const newOrder = yield addOrderToRestaurant(order);
            if (deliveryBoxBatches) {
                yield processDeliveryBoxBatches(deliveryBoxBatches, newOrder);
            }
            return newOrder;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating order with Delivery Box Batches.");
        }
    });
}
exports.addOrderToRestaurantWithDeliveryBoxBatches = addOrderToRestaurantWithDeliveryBoxBatches;
function processIngredientBatches(ingredientBatches, newOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const ingredientBatch of ingredientBatches) {
                const ingredient = yield (0, ingredient_query_1.findOneIngredientOfRestaurantWithUniqueIngredientId)(ingredientBatch.uniqueIngredientId, newOrder.restaurantId);
                if (ingredient) {
                    if (ingredientBatch.unitOfStock === "kg" || ingredientBatch.unitOfStock === "litre") {
                        ingredientBatch.purchaseQuantity *= 1000;
                    }
                    if (ingredientBatch.unitOfStock === "litre") {
                        ingredientBatch.unitOfStock = "ml";
                    }
                    else if (ingredientBatch.unitOfStock === "kg") {
                        ingredientBatch.unitOfStock = "gm";
                    }
                    ingredientBatch.purchasePrice *= 100;
                    ingredientBatch.ingredientId = ingredient.id;
                    ingredientBatch.orderId = newOrder.id;
                    ingredientBatch.restaurantId = newOrder.restaurantId;
                    ingredientBatch.supplierId = newOrder.supplierId;
                    ingredientBatch.currentStockQuantity = ingredientBatch.purchaseQuantity;
                    ingredientBatch.costPerUnit = Number(ingredientBatch.purchasePrice / ingredientBatch.purchaseQuantity);
                    const newIngredientBatch = yield (0, ingredientBatch_query_1.addIngredientToRestaurant)(ingredientBatch);
                    yield (0, ingredient_query_1.updateIngredientInfoOfRestaurantWithNewIngredientBatch)(newIngredientBatch);
                }
                else {
                    console.log("Error finding Ingredient With UniqueIngredientId.");
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding Ingredient To add ingredient Batches.");
        }
    });
}
function processDeliveryBoxBatches(deliveryBoxBatches, newOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const deliveryBoxBatch of deliveryBoxBatches) {
            deliveryBoxBatch.orderId = newOrder.id;
            deliveryBoxBatch.restaurantId = newOrder.restaurantId;
            deliveryBoxBatch.supplierId = newOrder.supplierId;
            deliveryBoxBatch.currentStockQuantity = deliveryBoxBatch.purchaseQuantity;
            deliveryBoxBatch.costPerUnit = deliveryBoxBatch.purchasePrice / deliveryBoxBatch.purchaseQuantity;
            const newDeliveryBoxBatch = yield (0, deliveryBoxBatch_query_1.addDeliveryBoxToRestaurant)(deliveryBoxBatch);
            yield (0, deliveryBox_query_1.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch)(newDeliveryBoxBatch);
        }
    });
}
function addOrderToRestaurantWithAllBatches(order, ingredientBatches, deliveryBoxBatches) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            order.totalPrice = 0;
            order.status = "delivered";
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
                yield processIngredientBatches(ingredientBatches, newOrder);
            }
            if (deliveryBoxBatches) {
                yield processDeliveryBoxBatches(deliveryBoxBatches, newOrder);
            }
            return newOrder;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating order with Batches.");
        }
    });
}
exports.addOrderToRestaurantWithAllBatches = addOrderToRestaurantWithAllBatches;
function addSupplierIfNoExists(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield axios_1.default.get(`${config_1.default.HELPER_API}/v1/vendor/${order.supplierId}`);
            if (vendor.data) {
                console.log(Object.assign({}, vendor.data.data));
                const newSupplier = {
                    vendorId: vendor.data.data.id,
                    name: vendor.data.data.name,
                    address: vendor.data.data.address,
                    contactNumber: vendor.data.data.contactNumber,
                    email: vendor.data.data.email,
                    label: 'New',
                    restaurantId: order.restaurantId,
                };
                console.log("newSupplier", newSupplier);
                const supplier = yield (0, supplier_query_1.addSupplier)(newSupplier);
                return supplier;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("Error adding supplier.");
        }
    });
}
exports.addSupplierIfNoExists = addSupplierIfNoExists;
function sendAutoPilotOrderToVendor(vendorId, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield axios_1.default.post(`${config_1.default.HELPER_API}/v1/vendor/${vendorId}/order`, order);
            return vendor;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error sending auto pilot order to vendor.");
        }
    });
}
exports.sendAutoPilotOrderToVendor = sendAutoPilotOrderToVendor;
