"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const consumptionLog_model_1 = __importDefault(require("../consumptionLog/consumptionLog.model"));
const wasteLog_model_1 = __importDefault(require("../wasteLog/wasteLog.model"));
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
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
        defaultValue: 'cents',
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    caloriesPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    reorderPoint: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    liquid: {
        type: sequelize_1.DataTypes.ENUM('Yes', 'No'),
        allowNull: false,
    },
    perishable: {
        type: sequelize_1.DataTypes.ENUM('Yes', 'No'),
        allowNull: false,
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
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    expectedStockForTomorrow: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
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
Ingredient.hasMany(consumptionLog_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'ingredientId',
});
consumptionLog_model_1.default.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});
Ingredient.hasMany(wasteLog_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'ingredientId',
});
wasteLog_model_1.default.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});
exports.default = Ingredient;
