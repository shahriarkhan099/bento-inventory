export interface IIngredientBatch {
  id: number;
  uniqueIngredientId: number;
  ingredientName: string;
  unitOfStock: string;
  currentStockQuantity: number;
  purchaseQuantity: number;
  unitOfPrice: string;
  purchasePrice: number;
  costPerUnit: number;
  receivedAt: Date;
  expirationDate: Date;
  supplierId: number;
  ingredientId: number;
  orderId: number;
  restaurantId: number;
}
