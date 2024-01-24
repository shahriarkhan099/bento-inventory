"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000,
    CORS_ORIGIN: (_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : "*",
    DB_URI: (_c = process.env.DB_URI) !== null && _c !== void 0 ? _c : 'postgres://postgres:st123@localhost:5432/inventorydb',
    SKELETON_BE_URL: (_d = process.env.SKELETON_BE_URL) !== null && _d !== void 0 ? _d : '',
    HELPER_API: (_e = process.env.HELPER_API) !== null && _e !== void 0 ? _e : ''
};
exports.default = config;
