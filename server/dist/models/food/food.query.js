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
exports.findFoodBySearchTerm = exports.addFoodToRestaurant = exports.findAllFood = exports.findAllFoodInRestaurant = void 0;
const sequelize_1 = require("sequelize");
const restaurant_model_1 = __importDefault(require("../restaurant/restaurant.model"));
const food_model_1 = __importDefault(require("./food.model"));
function findAllFoodInRestaurant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const food = yield food_model_1.default.findAll({
                where: {
                    restaurantId: id
                }
            });
            return food;
        }
        catch (error) {
            throw new Error('Error finding food in restaurant.');
        }
    });
}
exports.findAllFoodInRestaurant = findAllFoodInRestaurant;
function findAllFood() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const food = yield food_model_1.default.findAll({
                include: [restaurant_model_1.default]
            });
            return food;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error finding food.');
        }
    });
}
exports.findAllFood = findAllFood;
function addFoodToRestaurant(restaurantId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFood = yield food_model_1.default.create(Object.assign(Object.assign({}, data), { restaurantId }));
            return newFood;
        }
        catch (error) {
            throw new Error('Error adding food to restaurant.');
        }
    });
}
exports.addFoodToRestaurant = addFoodToRestaurant;
function findFoodBySearchTerm(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const food = yield food_model_1.default.findAll({
                where: {
                    name: { [sequelize_1.Op.iLike]: `%${searchTerm}%` }
                },
                include: [restaurant_model_1.default]
            });
            return food;
        }
        catch (error) {
            throw new Error('Error searching for food.');
        }
    });
}
exports.findFoodBySearchTerm = findFoodBySearchTerm;
