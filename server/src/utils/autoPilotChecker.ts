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

        if (ingredient && supplier) {
          const newIngredientBatch: any = {
            uniqueIngredientId: ingredient.uniqueIngredientId, 
            ingredientName: ingredient.ingredientName, 
            unitOfStock: ingredient.unitOfStock,
            currentStockQuantity: ingredient.currentStockQuantity,
            unitOfPrice: ingredient.unitOfPrice,
            costPerUnit: ingredient.costPerUnit,
            restaurantId: Number(restaurantId),
            categoryId: ingredient.categoryId,
          };

          await addIngredientToRestaurant(newIngredientBatch);
          await updateIngredientInfoOfRestaurantWithNewIngredientBatch(newIngredientBatch);
        }
      }
    }
    
    return ingredientList;
};

export default activateAutoPilot;