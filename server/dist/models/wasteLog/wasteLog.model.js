"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const WasteLog = __1.default.define('wasteLogs', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    ingredientName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    unitOfStock: {
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'piece'),
        allowNull: false,
    },
    totalQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
    },
    totalCost: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    expirationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    ingredientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = WasteLog;
