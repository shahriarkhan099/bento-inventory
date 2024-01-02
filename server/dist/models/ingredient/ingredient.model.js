"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
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
        type: sequelize_1.DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
        allowNull: false,
    },
    currentStockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    caloriesPerUnit: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    reorderPoint: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    perishable: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    unitOfIdealStoringTemperature: {
        type: sequelize_1.DataTypes.ENUM('Celsius', 'Fahrenheit'),
        allowNull: false,
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
        allowNull: true,
    },
});
Ingredient.hasMany(ingredientBatch_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'ingredientId',
});
ingredientBatch_model_1.default.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});
exports.default = Ingredient;
