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
exports.getSupplierByLabel = exports.deleteSupplierById = exports.searchSupplier = exports.editSupplier = exports.createSupplier = exports.getAllSuppliers = void 0;
const supplier_query_1 = require("../models/supplier/supplier.query");
function getAllSuppliers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplier = yield (0, supplier_query_1.findAllSuppliers)(parseInt(req.params.restaurantId));
            res.status(200).json({ suppliers: supplier });
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.getAllSuppliers = getAllSuppliers;
function createSupplier(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const newSupplier = req.body;
            console.log(newSupplier);
            newSupplier.restaurantId = restaurantId;
            if (restaurantId) {
                const supplier = yield (0, supplier_query_1.addSupplier)(newSupplier);
                res.status(201).json({ supplier: supplier });
            }
            else
                res.status(400).json({ message: "Invalid supplier information." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.createSupplier = createSupplier;
function editSupplier(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplierId = Number(req.params.supplierId);
            if (supplierId) {
                let newSupplier = req.body;
                if (typeof newSupplier.restaurantId === 'number') {
                    const supplier = yield (0, supplier_query_1.updateSupplier)(supplierId, newSupplier);
                    res.status(200).json(supplier);
                }
                else
                    res.status(400).json({ message: "Invalid supplier information." });
            }
            else
                res.status(400).json({ message: "Invalid supplier ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.editSupplier = editSupplier;
function searchSupplier(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const supplier = yield (0, supplier_query_1.findSupplierBySearchTerm)(restaurantId, searchTerm);
                res.json({ suppliers: supplier });
            }
            else
                res.json({ suppliers: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchSupplier = searchSupplier;
function deleteSupplierById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplierId = Number(req.params.supplierId);
            if (supplierId) {
                const deletedSupplier = yield (0, supplier_query_1.deleteSupplier)(supplierId);
                res.status(200).json(deletedSupplier);
            }
            else
                res.status(400).json({ message: "Invalid supplier ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteSupplierById = deleteSupplierById;
function getSupplierByLabel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const label = req.params.label;
            if (restaurantId) {
                const supplier = yield (0, supplier_query_1.findSupplierByLabel)(restaurantId, label);
                res.json({ suppliers: supplier });
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
exports.getSupplierByLabel = getSupplierByLabel;
