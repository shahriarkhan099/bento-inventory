import { checkAllIngredientOfAllRestaurantsIfNeededToOrderList } from "../models/ingredient/ingredient.query";

// Function to check items and move to order list
const activateAutoPilot = async () => {
    console.log('Auto-Pilot check starting');
    const ingredientList = await checkAllIngredientOfAllRestaurantsIfNeededToOrderList();
    console.log('Auto-Pilot check completed');
    return ingredientList;
};

export default activateAutoPilot;