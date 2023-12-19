"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRestaurantBySearchTerm = exports.createRestaurant = exports.findAllRestaurants = void 0;
const sequelize_1 = require("sequelize");
const restaurant_model_1 = __importDefault(require("./restaurant.model"));
function findAllRestaurants() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield restaurant_model_1.default.findAll();
            return restaurants;
        }
        catch (error) {
            throw new Error('Error finding all restaurants in DB.');
        }
    });
}
exports.findAllRestaurants = findAllRestaurants;
function createRestaurant(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newRestaurant = yield restaurant_model_1.default.create(data);
            return newRestaurant;
        }
        catch (error) {
            throw new Error('Error creating new restaurant in DB.');
        }
    });
}
exports.createRestaurant = createRestaurant;
function findRestaurantBySearchTerm(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield restaurant_model_1.default.findAll({
                where: {
                    name: { [sequelize_1.Op.iLike]: `%${searchTerm}%` }
                }
            });
            return restaurants;
        }
        catch (error) {
            throw new Error('Error searching restaurants.');
        }
    });
}
exports.findRestaurantBySearchTerm = findRestaurantBySearchTerm;
