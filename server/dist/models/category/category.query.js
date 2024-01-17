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
exports.deleteCategoryOfRestaurant = exports.updateCategoryOfRestaurant = exports.findCategoryBySearchTerm = exports.addCategoryToRestaurant = exports.findAllCategoryOfRestaurant = void 0;
const sequelize_1 = require("sequelize");
const category_model_1 = __importDefault(require("./category.model"));
function findAllCategoryOfRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield category_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                }
            });
            return category;
        }
        catch (error) {
            throw new Error('Error finding category.');
        }
    });
}
exports.findAllCategoryOfRestaurant = findAllCategoryOfRestaurant;
function addCategoryToRestaurant(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCategory = yield category_model_1.default.create(category);
            return newCategory;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating category.');
        }
    });
}
exports.addCategoryToRestaurant = addCategoryToRestaurant;
function findCategoryBySearchTerm(restaurantId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield category_model_1.default.findOne({
                where: {
                    categoryName: { [sequelize_1.Op.iLike]: `%${searchTerm}%` },
                    restaurantId: restaurantId
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
function updateCategoryOfRestaurant(categoryId, category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCategory = yield category_model_1.default.update(category, {
                where: {
                    id: categoryId
                }
            });
            return updatedCategory;
        }
        catch (error) {
            throw new Error('Error updating category.');
        }
    });
}
exports.updateCategoryOfRestaurant = updateCategoryOfRestaurant;
function deleteCategoryOfRestaurant(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedCategory = yield category_model_1.default.destroy({
                where: {
                    id: categoryId
                }
            });
            return deletedCategory;
        }
        catch (error) {
            throw new Error('Error deleting category.');
        }
    });
}
exports.deleteCategoryOfRestaurant = deleteCategoryOfRestaurant;
