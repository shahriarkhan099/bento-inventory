"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000,
    CORS_ORIGIN: (_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : "*",
    DB_URI: (_c = process.env.DB_URI) !== null && _c !== void 0 ? _c : 'postgres://postgres:st123@localhost:5432/inventorydb',
    SKELETON_URL: (_d = process.env.SKELETON_URL) !== null && _d !== void 0 ? _d : 'https://sak-skeleton-samiya-kazi.koyeb.app',
    HELPER_API: (_e = process.env.HELPER_API) !== null && _e !== void 0 ? _e : '',
    AMQP_URL: (_f = process.env.AMQP_URL) !== null && _f !== void 0 ? _f : "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct"
};
exports.default = config;
