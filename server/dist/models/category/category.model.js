"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const Category = __1.default.define('categories', {
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
    ingredientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    storageShelf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    storageType: {
        type: sequelize_1.DataTypes.ENUM('refrigerated', 'nonrefrigerated'),
        allowNull: false,
        defaultValue: 'refrigerated',
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    vegetarian: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    vegan: {
        type: sequelize_1.DataTypes.BOOLEAN,
    }
});
exports.default = Category;
