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
exports.findCategoryBySearchTerm = exports.addCategoryToRestaurant = exports.findAllIngredientOfCategoryOfRestaurant = exports.findAllCategoryOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const category_model_1 = __importDefault(require("./category.model"));
const category_model_2 = __importDefault(require("../category/category.model"));
function findAllCategoryOfRestaurant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield category_model_1.default.findAll({
                where: {
                    restaurantId: id
                }
            });
            return category;
        }
        catch (error) {
            throw new Error('Error finding category of the restaurant.');
        }
    });
}
exports.findAllCategoryOfRestaurant = findAllCategoryOfRestaurant;
function findAllIngredientOfCategoryOfRestaurant(categoryId, restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield category_model_1.default.findAll({
                where: {
                    id: categoryId,
                    restaurantId: restaurantId
                }, include: [{
                        model: category_model_2.default,
                        required: true
                    }]
            });
            return category;
        }
        catch (error) {
            throw new Error('Error finding ingredient of the category.');
        }
    });
}
exports.findAllIngredientOfCategoryOfRestaurant = findAllIngredientOfCategoryOfRestaurant;
function addCategoryToRestaurant(restaurantId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCategory = yield category_model_1.default.create(Object.assign(Object.assign({}, data), { restaurantId }));
            return newCategory;
        }
        catch (error) {
            throw new Error('Error adding category to the restaurant.');
        }
    });
}
exports.addCategoryToRestaurant = addCategoryToRestaurant;
function findCategoryBySearchTerm(id, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield category_model_1.default.findAll({
                where: {
                    categoryName: { [sequelize_1.Op.iLike]: `%${searchTerm}%` },
                    restaurantId: id
                }
            });
            return category;
        }
        catch (error) {
            throw new Error('Error searching for category.');
        }
    });
}
exports.findCategoryBySearchTerm = findCategoryBySearchTerm;
