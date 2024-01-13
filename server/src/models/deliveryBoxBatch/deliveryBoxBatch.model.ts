import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "..";
import { IDeliveryBoxBatch } from "../../interfaces/deliveryBoxBatch.interface";

interface DeliveryBoxBatchCreationAttributes
  extends Optional<IDeliveryBoxBatch, "id"> {}

interface DeliveryBoxBatchInstance
  extends Model<IDeliveryBoxBatch, DeliveryBoxBatchCreationAttributes>,
    IDeliveryBoxBatch {
  createdAt?: Date;
  updatedAt?: Date;
}

const DeliveryBoxBatch = sequelize.define<DeliveryBoxBatchInstance>(
  "deliveryBoxBatches",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    boxName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    currentStockQuantity: {
      type: DataTypes.FLOAT,
    },
    purchaseQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitOfPrice: {
      type: DataTypes.ENUM("cents", "usd"),
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    costPerUnit: {
      type: DataTypes.FLOAT,
    },
    receivedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliveryBoxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

export default DeliveryBoxBatch;