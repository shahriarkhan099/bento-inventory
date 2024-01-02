"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
;
const Supplier = __1.default.define('suppliers', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    label: {
        type: sequelize_1.DataTypes.ENUM('Good', 'Best', 'Bad', 'Worst'),
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
Supplier.hasMany(ingredientBatch_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'supplierId',
});
ingredientBatch_model_1.default.belongsTo(Supplier, {
    foreignKey: 'supplierId',
});
Supplier.hasMany(order_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'supplierId',
});
order_model_1.default.belongsTo(Supplier, {
    foreignKey: 'supplierId',
});
exports.default = Supplier;
