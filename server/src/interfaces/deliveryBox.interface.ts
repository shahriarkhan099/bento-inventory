export interface IDeliveryBox {
    id: number;
    boxName: string;
    height: number;
    width: number;
    length: number;
    weightLimit: number;
    temperatureLimit: number;
    waterproof: boolean;
    specialInstructions: Text;
    restaurantId: number;
}
