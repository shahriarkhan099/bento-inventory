"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const category_model_1 = __importDefault(require("../category/category.model"));
;
const Ingredient = __1.default.define('ingredients', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ingredientName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
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
    idealStoringTemperature: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    receivedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
});
Ingredient.hasOne(category_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'ingredientId',
});
category_model_1.default.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});
exports.default = Ingredient;
