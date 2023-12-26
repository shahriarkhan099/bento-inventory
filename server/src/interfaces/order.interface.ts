export interface IOrder {
    id: number;
    totalPrice: number;
    status: string;
    orderDate : Date;
    deliveryDate : Date;
    restaurantId: number;
}