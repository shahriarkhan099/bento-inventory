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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.searchCategory = exports.postCategoryToRestaurant = exports.getAllCategoryOfRestaurant = void 0;
const category_query_1 = require("../models/category/category.query");
function getAllCategoryOfRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                const category = yield (0, category_query_1.findAllCategoryOfRestaurant)(restaurantId);
                res.json({ categories: category });
            }
            else
                res.status(400).json({ message: "Invalid restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.getAllCategoryOfRestaurant = getAllCategoryOfRestaurant;
function postCategoryToRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            if (restaurantId) {
                let category = req.body;
                category.restaurantId = restaurantId;
                if (typeof category.categoryName === 'string') {
                    const newCategpry = yield (0, category_query_1.addCategoryToRestaurant)(category);
                    res.status(201).json("Created");
                }
                else {
                    res.status(400).json({ message: "Invalid category information." });
                }
            }
            else
                res.status(400).json({ message: "Invalid restaurant ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.postCategoryToRestaurant = postCategoryToRestaurant;
function searchCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const categories = yield (0, category_query_1.findCategoryBySearchTerm)(restaurantId, searchTerm);
                res.json({ categories: categories });
            }
            else
                res.json({ categories: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchCategory = searchCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = Number(req.params.categoryId);
            if (categoryId) {
                let category = req.body;
                if (typeof category.categoryName === 'string') {
                    const updatedCategory = yield (0, category_query_1.updateCategoryOfRestaurant)(categoryId, category);
                    res.status(200).json(updatedCategory);
                }
                else
                    res.status(400).json({ message: "Invalid category information." });
            }
            else
                res.status(400).json({ message: "Invalid category ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryId = Number(req.params.categoryId);
            if (categoryId) {
                const deletedCategory = yield (0, category_query_1.deleteCategoryOfRestaurant)(categoryId);
                res.status(200).json(deletedCategory);
            }
            else
                res.status(400).json({ message: "Invalid category ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteCategory = deleteCategory;
