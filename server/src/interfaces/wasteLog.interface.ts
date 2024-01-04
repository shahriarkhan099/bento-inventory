export interface IWasteLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  totalQuantity: number;
  unitOfCost: string;
  totalCost: number;
  costPerUnit: number;
  expirationDate: Date;
  ingredientId: number;
  restaurantId: number;
}
