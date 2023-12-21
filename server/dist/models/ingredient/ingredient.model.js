"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const Ingredient = __1.default.define('ingredients', {
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
    currentStockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM('cents'),
        allowNull: false,
    },
    purchasePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    caloriesPerUnit: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    expirationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    reorderPoint: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    unitOfIdealStoringTemperature: {
        type: sequelize_1.DataTypes.ENUM('Celsius', 'Fahrenheit'),
        allowNull: false,
        defaultValue: 'Celsius',
    },
    idealStoringTemperature: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    expectedStockForToday: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    expectedStockForTomorrow: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = Ingredient;
