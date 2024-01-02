export interface IIngredient {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    costPerUnit: number;
    caloriesPerUnit: number;
    reorderPoint: number;
    expectedStockForToday: number;
    expectedStockForTomorrow: number;
    perishable: boolean;
    description: string;
    unitOfIdealStoringTemperature: string;
    idealStoringTemperature: number;
    restaurantId: number;
    categoryId: number;
}