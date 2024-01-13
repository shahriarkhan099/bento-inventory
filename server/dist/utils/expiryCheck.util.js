"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wasteLog_query_1 = require("../models/wasteLog/wasteLog.query");
// Function to check and move expired ingredients to WasteLog
const checkExpiryDateAndRemove = () => {
    console.log('Expiry check completed');
    (0, wasteLog_query_1.addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant)();
    console.log('Expiry check completed 2');
};
exports.default = checkExpiryDateAndRemove;
