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
exports.findSupplierByLabel = exports.deleteSupplier = exports.findSupplierBySearchTerm = exports.updateSupplier = exports.addSupplier = exports.findAllSuppliers = void 0;
const sequelize_1 = require("sequelize");
const supplier_model_1 = __importDefault(require("./supplier.model"));
function findAllSuppliers(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const suppliers = yield supplier_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                }
            });
            return suppliers;
        }
        catch (error) {
            throw new Error('Error finding suppliers.');
        }
    });
}
exports.findAllSuppliers = findAllSuppliers;
function addSupplier(supplier, restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdSupplier = yield supplier_model_1.default.create(Object.assign(Object.assign({}, supplier), { restaurantId: restaurantId }));
            return createdSupplier;
        }
        catch (error) {
            throw new Error('Error creating supplier.');
        }
    });
}
exports.addSupplier = addSupplier;
function updateSupplier(supplierId, supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedSupplier = yield supplier_model_1.default.update(supplier, {
                where: {
                    id: supplierId
                }
            });
            return updatedSupplier;
        }
        catch (error) {
            throw new Error('Error updating supplier.');
        }
    });
}
exports.updateSupplier = updateSupplier;
function findSupplierBySearchTerm(restaurantId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplier = yield supplier_model_1.default.findAll({
                where: {
                    name: { [sequelize_1.Op.iLike]: `%${searchTerm}%` },
                    restaurantId: restaurantId
                }
            });
            return supplier;
        }
        catch (error) {
            throw new Error('Error searching for supplier.');
        }
    });
}
exports.findSupplierBySearchTerm = findSupplierBySearchTerm;
function deleteSupplier(supplierId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedSupplier = yield supplier_model_1.default.destroy({
                where: {
                    id: supplierId
                }
            });
            return deletedSupplier;
        }
        catch (error) {
            throw new Error('Error deleting supplier.');
        }
    });
}
exports.deleteSupplier = deleteSupplier;
function findSupplierByLabel(restaurantId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplier = yield supplier_model_1.default.findAll({
                where: {
                    label: label,
                    restaurantId: restaurantId
                }
            });
            return supplier;
        }
        catch (error) {
            throw new Error('Error finding supplier.');
        }
    });
}
exports.findSupplierByLabel = findSupplierByLabel;
