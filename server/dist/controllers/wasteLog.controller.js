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
exports.removeWasteLog = exports.searchWasteLog = exports.editWasteLog = exports.createWasteLog = exports.getAllWasteLogWithIngredient = void 0;
const wasteLog_query_1 = require("../models/wasteLog/wasteLog.query");
function getAllWasteLogWithIngredient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wasteLog = yield (0, wasteLog_query_1.findAllWasteLogWithIngredient)(parseInt(req.params.restaurantId));
            res.status(200).json({ wasteLogs: wasteLog });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.getAllWasteLogWithIngredient = getAllWasteLogWithIngredient;
function createWasteLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const wasteLog = req.body;
            if (typeof wasteLog.ingredientId === 'number') {
                const newWasteLog = yield (0, wasteLog_query_1.addWasteLog)(wasteLog, restaurantId);
                res.status(201).json({ wasteLog: wasteLog });
            }
            else
                res.status(400).json({ message: "Invalid waste log information." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.createWasteLog = createWasteLog;
function editWasteLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wasteLogId = Number(req.params.wasteLogId);
            if (wasteLogId) {
                let wasteLog = req.body;
                if (typeof wasteLog.restaurantId === 'number') {
                    const updatedWasteLog = yield (0, wasteLog_query_1.updateWasteLog)(wasteLogId, wasteLog);
                    res.status(200).json(updatedWasteLog);
                }
                else
                    res.status(400).json({ message: "Invalid waste log information." });
            }
            else
                res.status(400).json({ message: "Invalid waste log ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.editWasteLog = editWasteLog;
function searchWasteLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const search = req.query.q;
            const searchTerm = search === null || search === void 0 ? void 0 : search.toString();
            if (searchTerm) {
                const wasteLog = yield (0, wasteLog_query_1.findWasteLogBySearchTerm)(restaurantId, searchTerm);
                res.json({ wasteLogs: wasteLog });
            }
            else
                res.json({ wasteLogs: [] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.searchWasteLog = searchWasteLog;
function removeWasteLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wasteLogId = Number(req.params.wasteLogId);
            if (wasteLogId) {
                yield (0, wasteLog_query_1.deleteWasteLog)(wasteLogId);
                res.status(200).json({ message: "Waste log deleted." });
            }
            else
                res.status(400).json({ message: "Invalid waste log ID." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.removeWasteLog = removeWasteLog;
