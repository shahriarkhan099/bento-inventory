"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const IngredientBatch = __1.default.define('ingredientBatches', {
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
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
        allowNull: false,
    },
    purchaseQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    currentStockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
    },
    purchasePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    receivedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    expirationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    supplierId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ingredientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
});
exports.default = IngredientBatch;
