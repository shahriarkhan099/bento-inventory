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
exports.findIngredientBySearchTerm = exports.addIngredientToRestaurant = exports.findAllIngredientOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const ingredient_model_1 = __importDefault(require("./ingredient.model"));
function findAllIngredientOfRestaurant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    restaurantId: id
                }
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error finding ingredient of the restaurant.');
        }
    });
}
exports.findAllIngredientOfRestaurant = findAllIngredientOfRestaurant;
function addIngredientToRestaurant(restaurantId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newIngredient = yield ingredient_model_1.default.create(Object.assign(Object.assign({}, data), { restaurantId, receivedAt: new Date() }));
            return newIngredient;
        }
        catch (error) {
            throw new Error('Error adding ingredient to the restaurant.');
        }
    });
}
exports.addIngredientToRestaurant = addIngredientToRestaurant;
function findIngredientBySearchTerm(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredient = yield ingredient_model_1.default.findAll({
                where: {
                    name: { [sequelize_1.Op.iLike]: `%${searchTerm}%` }
                },
                // include: [Restaurant]
            });
            return ingredient;
        }
        catch (error) {
            throw new Error('Error searching for ingredient.');
        }
    });
}
exports.findIngredientBySearchTerm = findIngredientBySearchTerm;
