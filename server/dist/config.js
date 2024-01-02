"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000,
    DB_URI: (_b = process.env.DB_URI) !== null && _b !== void 0 ? _b : 'postgres://postgres:st123@localhost:5432/inventorydb'
};
exports.default = config;
