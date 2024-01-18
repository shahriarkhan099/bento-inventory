export interface IWasteLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  totalQuantity: number;
  unitOfPrice: string;
  totalCost: number;
  costPerUnit: number;
  boughtAt?: Date;
  expirationDate: Date;
  ingredientId: number;
  restaurantId: number;
}
