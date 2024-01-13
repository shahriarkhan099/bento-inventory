export interface IOrder {
  id: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  deliveryDate: Date;
  scheduleTime: Date;
  supplierId: number;
  restaurantId: number;
}
