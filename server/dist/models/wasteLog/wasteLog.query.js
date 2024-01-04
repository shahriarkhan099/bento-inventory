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
exports.findWasteLogBySearchTerm = exports.updateWasteLog = exports.addWasteLog = exports.findAllWasteLogWithIngredient = void 0;
const sequelize_1 = require("sequelize");
const wasteLog_model_1 = __importDefault(require("./wasteLog.model"));
const ingredientBatch_model_1 = __importDefault(require("../ingredientBatch/ingredientBatch.model"));
function findAllWasteLogWithIngredient(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wasteLog = yield wasteLog_model_1.default.findAll({
                where: {
                    restaurantId: restaurantId
                },
                include: [ingredientBatch_model_1.default]
            });
            return wasteLog;
        }
        catch (error) {
            throw new Error('Error finding waste logs.');
        }
    });
}
exports.findAllWasteLogWithIngredient = findAllWasteLogWithIngredient;
function addWasteLog(wasteLog, restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            wasteLog.restaurantId = restaurantId;
            const createdWasteLog = yield wasteLog_model_1.default.create(wasteLog);
            return createdWasteLog;
        }
        catch (error) {
            throw new Error('Error creating waste log.');
        }
    });
}
exports.addWasteLog = addWasteLog;
// export async function addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant () {
//   try {
//     const ingredientBatches = await IngredientBatch.findAll({
//       where: {
//         currentStockQuantity: {
//           [Op.gt]: 0
//         },
//       },
//       order: [
//         ['createdAt', 'ASC']
//       ]
//     });
//     for (let i = 0; i < ingredientBatches.length; i++) {
//       const ingredientBatch = ingredientBatches[i];
//       const wasteLog = await WasteLog.findOne({
//         where: {
//           id: ingredientBatch.id
//         }
//       });
//       if (wasteLog) {
//         continue;
//       }
//       const today = new Date();
//       const expirationDate = new Date(ingredientBatch.expirationDate);
//       if (today > expirationDate) {
//         const wasteLog = {
//           ingredientBatchId: ingredientBatch.id,
//           ingredientName: ingredientBatch.ingredientName,
//           quantity: ingredientBatch.currentStockQuantity,
//           wasteDate: today
//         }
//         await addWasteLog(wasteLog, ingredientBatch.restaurantId);
//       }
//     }
//   } catch (error) {
//     throw new Error('Error creating waste log.');
//   }
// } 
function updateWasteLog(wasteLogId, wasteLog) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedWasteLog = yield wasteLog_model_1.default.update(wasteLog, {
                where: {
                    id: wasteLogId
                }
            });
            return updatedWasteLog;
        }
        catch (error) {
            throw new Error('Error updating waste log.');
        }
    });
}
exports.updateWasteLog = updateWasteLog;
function findWasteLogBySearchTerm(restaurantId, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wasteLog = yield wasteLog_model_1.default.findAll({
                where: {
                    ingredientName: { [sequelize_1.Op.iLike]: `%${searchTerm}%` },
                    restaurantId: restaurantId
                }
            });
            return wasteLog;
        }
        catch (error) {
            throw new Error('Error searching for waste log.');
        }
    });
}
exports.findWasteLogBySearchTerm = findWasteLogBySearchTerm;
