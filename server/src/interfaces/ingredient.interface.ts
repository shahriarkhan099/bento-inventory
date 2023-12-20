export interface IIngredient {
    id: number;
    restaurantId: number;
    ingredientName: string;
    unit: string;
    stockQuantity: number;
    purchasePrice: number;
    costPerUnit?: number;
    caloriesPerUnit?: number;
    expirationDate?: Date; 
    reorderPoint?: number;
    description?: string;
    idealStoringTemperature?: number;
    receivedAt: Date;
}
