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
exports.deductDeliveryBoxesFromOrder = exports.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch = exports.updateCurrentStockQuantityOfDeliveryBox = exports.findOneDeliveryBoxOfRestaurant = exports.deleteDeliveryBox = exports.updateDeliveryBox = exports.createDeliveryBoxOfRestaurant = exports.findDeliveryBoxesByBoxName = exports.findAllDeliveryBoxesOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const deliveryBox_model_1 = __importDefault(require("./deliveryBox.model"));
const deliveryBoxBatch_model_1 = __importDefault(require("../deliveryBoxBatch/deliveryBoxBatch.model"));
const deliveryBoxBatch_query_1 = require("../deliveryBoxBatch/deliveryBoxBatch.query");
function findAllDeliveryBoxesOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBoxes = yield deliveryBox_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                },
            });
            return deliveryBoxes;
        }
        catch (error) {
            throw new Error("Error finding delivery boxes.");
        }
    });
}
exports.findAllDeliveryBoxesOfRestaurant = findAllDeliveryBoxesOfRestaurant;
function findDeliveryBoxesByBoxName(restaurantId, boxName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBoxes = yield deliveryBox_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId,
                    boxName: {
                        [sequelize_1.Op.like]: `%${boxName}%`,
                    },
                },
            });
            return deliveryBoxes;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error finding delivery boxes.");
        }
    });
}
exports.findDeliveryBoxesByBoxName = findDeliveryBoxesByBoxName;
function createDeliveryBoxOfRestaurant(deliveryBox, restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            deliveryBox.restaurantId = restaurantId;
            const newDeliveryBox = yield deliveryBox_model_1.default.create(deliveryBox);
            return newDeliveryBox;
        }
        catch (error) {
            throw new Error("Error creating delivery box.");
        }
    });
}
exports.createDeliveryBoxOfRestaurant = createDeliveryBoxOfRestaurant;
function updateDeliveryBox(deliveryBoxId, deliveryBox) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedDeliveryBox = yield deliveryBox_model_1.default.update(deliveryBox, {
                where: {
                    id: deliveryBoxId,
                },
            });
            return updatedDeliveryBox;
        }
        catch (error) {
            throw new Error("Error updating delivery box.");
        }
    });
}
exports.updateDeliveryBox = updateDeliveryBox;
function deleteDeliveryBox(deliveryBoxId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedDeliveryBox = yield deliveryBox_model_1.default.destroy({
                where: {
                    id: deliveryBoxId,
                },
            });
            return deletedDeliveryBox;
        }
        catch (error) {
            throw new Error("Error deleting delivery box.");
        }
    });
}
exports.deleteDeliveryBox = deleteDeliveryBox;
function findOneDeliveryBoxOfRestaurant(deliveryBoxId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBox = yield deliveryBox_model_1.default.findOne({
                where: {
                    id: deliveryBoxId,
                },
            });
            return deliveryBox;
        }
        catch (error) {
            throw new Error("Error finding global ingredient.");
        }
    });
}
exports.findOneDeliveryBoxOfRestaurant = findOneDeliveryBoxOfRestaurant;
function updateCurrentStockQuantityOfDeliveryBox(deliveryBoxId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBox = yield findOneDeliveryBoxOfRestaurant(deliveryBoxId);
            let updatedDeliveryBox;
            if (deliveryBox) {
                let totalStockQuantity = yield deliveryBoxBatch_model_1.default.sum("currentStockQuantity", {
                    where: {
                        currentStockQuantity: {
                            [sequelize_1.Op.ne]: 0,
                        },
                        deliveryBoxId: deliveryBox.id,
                    },
                });
                if (!totalStockQuantity) {
                    totalStockQuantity = 0;
                }
                updatedDeliveryBox = yield deliveryBox_model_1.default.update({
                    currentStockQuantity: totalStockQuantity,
                }, {
                    where: {
                        id: deliveryBox.id,
                    },
                });
            }
            else {
                throw new Error('Delivery box not found.');
            }
            return updatedDeliveryBox;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating global delivery box.");
        }
    });
}
exports.updateCurrentStockQuantityOfDeliveryBox = updateCurrentStockQuantityOfDeliveryBox;
function updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(deliveryBoxBatch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBox = yield findOneDeliveryBoxOfRestaurant(deliveryBoxBatch.deliveryBoxId);
            let updatedDeliveryBox;
            if (deliveryBox) {
                yield updateCurrentStockQuantityOfDeliveryBox(deliveryBox.id);
                const averageCostPerUnit = yield deliveryBoxBatch_model_1.default.findOne({
                    attributes: [
                        [index_1.default.fn('AVG', index_1.default.col('costPerUnit')), 'costPerUnit']
                    ],
                    where: {
                        deliveryBoxId: deliveryBox.id,
                        receivedAt: {
                            [sequelize_1.Op.gte]: index_1.default.literal("NOW() - INTERVAL '1 YEAR'"),
                        },
                    },
                });
                updatedDeliveryBox = yield deliveryBox.update({
                    costPerUnit: averageCostPerUnit ? averageCostPerUnit.dataValues.costPerUnit : 0,
                }, {
                    where: {
                        id: deliveryBoxBatch.deliveryBoxId,
                    },
                });
            }
            else {
                throw new Error('Delivery box not found.');
            }
            return updatedDeliveryBox;
        }
        catch (error) {
            throw new Error('Error updating global delivery box.');
        }
    });
}
exports.updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch = updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch;
function deductDeliveryBoxesFromOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderType, deliveryBoxesToReduce, restaurantId } = order;
        const transaction = yield index_1.default.transaction();
        try {
            const deductedDeliveryBoxes = [];
            for (const deliveryBoxToReduce of deliveryBoxesToReduce) {
                const { id, quantity } = deliveryBoxToReduce;
                const deliveryBox = yield findOneDeliveryBoxOfRestaurant(id);
                if (deliveryBox) {
                    const deductedBatches = yield (0, deliveryBoxBatch_query_1.deductDeliveryBoxInFIFO)(deliveryBox.id, quantity, orderType);
                    updateCurrentStockQuantityOfDeliveryBox(deliveryBox.id);
                    deductedDeliveryBoxes.push({
                        deliveryBoxId: deliveryBox.id,
                        deductedDeliveryBoxBatches: deductedBatches,
                    });
                }
                else {
                    throw new Error("Delivery box not found.");
                }
            }
            yield transaction.commit();
            return deductedDeliveryBoxes;
        }
        catch (error) {
            yield transaction.rollback();
            throw new Error(`Error deducting delivery boxes: ${error}`);
        }
    });
}
exports.deductDeliveryBoxesFromOrder = deductDeliveryBoxesFromOrder;
