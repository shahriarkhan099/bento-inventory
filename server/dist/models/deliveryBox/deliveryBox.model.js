"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
;
const DeliveryBox = __1.default.define('deliveryBoxes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    boxName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    width: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    length: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    temperatureLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    waterproof: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    specialInstructions: {
        type: sequelize_1.DataTypes.TEXT,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = DeliveryBox;
