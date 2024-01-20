"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.DB_URI, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // You may need to set this to false in some environments
        },
    },
});
exports.default = sequelize;
