"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const deliveryBoxBatch_model_1 = __importDefault(require("../deliveryBoxBatch/deliveryBoxBatch.model"));
;
const Order = __1.default.define('orders', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deliveryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    supplierId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
Order.hasMany(ingredientBatch_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'orderId'
});
ingredientBatch_model_1.default.belongsTo(Order, {
    foreignKey: 'orderId'
});
Order.hasMany(deliveryBoxBatch_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'orderId'
});
deliveryBoxBatch_model_1.default.belongsTo(Order, {
    foreignKey: 'orderId'
});
exports.default = Order;
