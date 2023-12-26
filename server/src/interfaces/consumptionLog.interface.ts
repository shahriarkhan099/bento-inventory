export interface IWasteLog {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    costPerUnit: number;
    expirationDate: Date; 
    restaurantId: number;
    categoryId: number;
}