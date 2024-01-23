import { addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant } from "../models/wasteLog/wasteLog.query";

// Function to check and move expired ingredients to WasteLog
const checkExpiryDateAndRemove = () => {
    console.log('Expiry check starting');
    addToWasteLogByCheckingExpirationDateOfAllIngredientBatchesOfAllRestaurant();
    console.log('Expiry check completed');
};

export default checkExpiryDateAndRemove;