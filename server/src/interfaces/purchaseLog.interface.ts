export interface IPurchaseLog {
    id: number;
    quantity: number;
    unit: string;
    expirationDate: Date;
    deliveryDate : Date;
    unitPrice: number;
    totalPrice: number;
    supplierId: number;
    restaurantId: number;
}
