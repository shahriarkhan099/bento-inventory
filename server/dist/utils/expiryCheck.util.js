"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wasteLog_query_1 = require("../models/wasteLog/wasteLog.query");
// Function to check and move expired ingredients to WasteLog
const checkExpiryDateAndRemove = () => {
    console.log('Expiry check starting');
    (0, wasteLog_query_1.addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant)();
    console.log('Expiry check completed');
};
exports.default = checkExpiryDateAndRemove;
