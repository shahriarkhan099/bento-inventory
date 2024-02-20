"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const ConsumptionLog = __1.default.define("consumptionLogs", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    itemName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    itemType: {
        type: sequelize_1.DataTypes.ENUM('ingredient', 'box'),
        allowNull: false,
        defaultValue: 'ingredient',
    },
    unitOfStock: {
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    orderType: {
        type: sequelize_1.DataTypes.ENUM('in-house', 'delivery', 'pickup'),
        allowNull: false,
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    consumedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    itemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = ConsumptionLog;
