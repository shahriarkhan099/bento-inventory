"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const food_model_1 = __importDefault(require("../food/food.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
;
const Restaurant = __1.default.define('restaurant', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    }
});
Restaurant.hasMany(food_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'restaurantId',
});
food_model_1.default.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
});
Restaurant.hasMany(order_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'restaurantId',
});
order_model_1.default.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
});
exports.default = Restaurant;
