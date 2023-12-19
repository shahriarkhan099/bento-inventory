"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const orderItem_model_1 = __importDefault(require("../orderItem/orderItem.model"));
;
const Order = __1.default.define('orders', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    status: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
});
Order.hasMany(orderItem_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'orderId',
});
orderItem_model_1.default.belongsTo(Order, {
    foreignKey: 'orderId',
});
exports.default = Order;
