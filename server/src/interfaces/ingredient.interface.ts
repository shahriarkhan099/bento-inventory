export interface IIngredient {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    purchasePrice: number;
    costPerUnit: number;
    caloriesPerUnit: number;
    expirationDate: Date; 
    reorderPoint: number;
    description: string;
    unitOfIdealStoringTemperature: string;
    idealStoringTemperature: number;
    expectedStockForToday: number;
    expectedStockForTomorrow: number;
    restaurantId: number;
    categoryId: number;
}
