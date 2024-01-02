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
exports.deleteDeliveryBox = exports.updateDeliveryBox = exports.createDeliveryBoxOfRestaurant = exports.findDeliveryBoxesByBoxName = exports.findAllDeliveryBoxesOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const deliveryBox_model_1 = __importDefault(require("./deliveryBox.model"));
function findAllDeliveryBoxesOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deliveryBoxes = yield deliveryBox_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                }
            });
            return deliveryBoxes;
        }
        catch (error) {
            throw new Error('Error finding delivery boxes.');
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
                        [sequelize_1.Op.like]: `%${boxName}%`
                    }
                }
            });
            return deliveryBoxes;
        }
        catch (error) {
            throw new Error('Error finding delivery boxes.');
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
            throw new Error('Error creating delivery box.');
        }
    });
}
exports.createDeliveryBoxOfRestaurant = createDeliveryBoxOfRestaurant;
function updateDeliveryBox(deliveryBoxId, deliveryBox) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedDeliveryBox = yield deliveryBox_model_1.default.update(deliveryBox, {
                where: {
                    id: deliveryBoxId
                }
            });
            return updatedDeliveryBox;
        }
        catch (error) {
            throw new Error('Error updating delivery box.');
        }
    });
}
exports.updateDeliveryBox = updateDeliveryBox;
function deleteDeliveryBox(deliveryBoxId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedDeliveryBox = yield deliveryBox_model_1.default.destroy({
                where: {
                    id: deliveryBoxId
                }
            });
            return deletedDeliveryBox;
        }
        catch (error) {
            throw new Error('Error deleting delivery box.');
        }
    });
}
exports.deleteDeliveryBox = deleteDeliveryBox;
