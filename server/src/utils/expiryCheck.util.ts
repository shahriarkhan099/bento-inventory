import { addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant } from "../models/wasteLog/wasteLog.query";

// Function to check and move expired ingredients to WasteLog
const checkExpiryDateAndRemove = () => {
    console.log('Expiry check completed');
    addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant();
    console.log('Expiry check completed 2');
};

export default checkExpiryDateAndRemove;