export interface IIngredientBatch {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    purchasePrice: number;
    costPerUnit: number;
    expirationDate: Date; 
    supplierId: number;
    globalIngredientId: number;
    restaurantId: number;
}
