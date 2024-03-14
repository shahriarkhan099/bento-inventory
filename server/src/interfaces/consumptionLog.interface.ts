export interface IConsumptionLog {
  id?: number;
  itemName: string;
  itemType: string;
  unitOfStock: string;
  quantity: number;
  orderType: string;
  costPerUnit: number;
  consumedAt: Date;
  itemId: number;
  restaurantId: number;
  totalQuantity?: number;
}
