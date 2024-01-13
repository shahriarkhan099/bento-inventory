import { IDeliveryBoxBatch } from "./deliveryBoxBatch.interface";

export interface DeliveryBoxToReduce {
  id: number;
  quantity: number;
}

export interface DeductedDeliveryBox {
  deliveryBoxId: number;
  deductedDeliveryBoxBatches: IDeliveryBoxBatch[];
}