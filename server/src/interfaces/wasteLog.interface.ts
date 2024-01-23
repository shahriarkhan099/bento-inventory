export interface IWasteLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  totalQuantity: number;
  unitOfPrice: string;
  totalCost: number;
  costPerUnit: number;
  boughtAt?: Date;
  consumptionQuantity: number;
  wastagePercentage: number;
  expirationDate: Date;
  ingredientId: number;
  restaurantId: number;
}
