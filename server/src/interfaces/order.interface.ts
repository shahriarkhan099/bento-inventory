export interface IOrder {
    id: number;
    totalPrice: number;
    status: string;
    orderDate : Date;
    deliveryDate : Date;
    supplierId: number;
    restaurantId: number;
}