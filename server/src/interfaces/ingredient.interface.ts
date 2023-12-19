export interface IIngredient {
    id: number;
    // categoryId?: number;
    // supplierId?: number;
    restaurantId: number;
    name: string;
    unit: string;
    stockQuantity: number;
    purchasePrice: number;
    costPerUnit?: number;
    caloriesPerUnit?: number;
    expirationDate?: Date; 
    reorderPoint?: number;
    description?: string;
    imageUrl?: string;
    idealStoringTemperature?: number;
    receivedAt: Date;
}
