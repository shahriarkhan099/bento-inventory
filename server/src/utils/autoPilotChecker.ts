import { updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch } from "../models/deliveryBox/deliveryBox.query";
import { addDeliveryBoxToRestaurant } from "../models/deliveryBoxBatch/deliveryBoxBatch.query";
import { addIngredientToRestaurant, checkAllIngredientOfAllRestaurantsIfNeededToOrderList, findOneIngredientOfRestaurant, findOneIngredientOfRestaurantWithUniqueIngredientId, updateIngredientInfoOfRestaurantWithNewIngredientBatch } from "../models/ingredient/ingredient.query";
import { checkSupplierAndFindWhichHasEarliestDeliveryDate } from "../models/supplier/supplier.query";

// Function to check items and move to order list
const activateAutoPilot = async () => {
    console.log('Auto-Pilot check starting');
    const ingredientList = await checkAllIngredientOfAllRestaurantsIfNeededToOrderList();
    console.log('Auto-Pilot check completed');

    const restaurantIds = Object.keys(ingredientList);

    for (const restaurantId of restaurantIds) {
      const ingredientIds = ingredientList[parseInt(restaurantId, 10)] || [];
      const ingredientIdsArray = Array.isArray(ingredientIds) ? ingredientIds : Object.values(ingredientIds);

      for (const ingredientId of ingredientIdsArray) {
        const ingredient = await findOneIngredientOfRestaurant(ingredientId);
        const supplier = await checkSupplierAndFindWhichHasEarliestDeliveryDate(Number(restaurantId));
    
        // const newIngredientBatch = await addIngredientToRestaurant(Number(restaurantId), ingredientId, supplier.id, ingredient.quantity);
        // const deliveryBox = await addDeliveryBoxToRestaurant(Number(restaurantId), supplier.id, ingredient.quantity);
        // const newDeliveryBoxBatch = await updateDeliveryBoxInfoOfRestaurantWithNewDeliveryBoxBatch(Number(restaurantId), supplier.id, deliveryBox.quantity);
        // const newIngredient = await updateIngredientInfoOfRestaurantWithNewIngredientBatch(Number(restaurantId), ingredientId, newIngredientBatch.quantity);
      }
    }
    
    return ingredientList;
};

export default activateAutoPilot;