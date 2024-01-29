"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const deliveryBoxBatch_model_1 = __importDefault(require("../deliveryBoxBatch/deliveryBoxBatch.model"));
const consumptionLog_model_1 = __importDefault(require("../consumptionLog/consumptionLog.model"));
const DeliveryBox = __1.default.define("deliveryBoxes", {
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
    currentStockQuantity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 9999,
    },
    unitOfPrice: {
        type: sequelize_1.DataTypes.ENUM("cents", "usd"),
        allowNull: false,
        defaultValue: "cents",
    },
    costPerUnit: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    reorderPoint: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    unitOfDimentions: {
        type: sequelize_1.DataTypes.ENUM("cm", "inch"),
        allowNull: false,
        defaultValue: "cm",
    },
    dimensions: {
        // Length x Width x Height
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    temperatureLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    waterproof: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No"),
        allowNull: false,
        defaultValue: "No",
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
});
DeliveryBox.hasMany(deliveryBoxBatch_model_1.default, {
    sourceKey: "id",
    foreignKey: "deliveryBoxId",
});
deliveryBoxBatch_model_1.default.belongsTo(DeliveryBox, {
    foreignKey: "deliveryBoxId",
});
DeliveryBox.hasMany(consumptionLog_model_1.default, {
    sourceKey: "id",
    foreignKey: "deliveryBoxId",
});
consumptionLog_model_1.default.belongsTo(DeliveryBox, {
    foreignKey: "deliveryBoxId",
});
exports.default = DeliveryBox;
