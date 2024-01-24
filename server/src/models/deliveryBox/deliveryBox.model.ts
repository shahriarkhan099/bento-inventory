import { Model, DataTypes, Optional } from "sequelize";
import { IDeliveryBox } from "../../interfaces/deliveryBox.interface";
import sequelize from "..";
import DeliveryBoxBatch from "../deliveryBoxBatch/deliveryBoxBatch.model";
import ConsumptionLog from "../consumptionLog/consumptionLog.model";

interface DeliveryBoxCreationAttributes extends Optional<IDeliveryBox, "id"> {}

interface DeliveryBoxInstance
  extends Model<IDeliveryBox, DeliveryBoxCreationAttributes>,
    IDeliveryBox {
  createdAt?: Date;
  updatedAt?: Date;
}

const DeliveryBox = sequelize.define<DeliveryBoxInstance>("deliveryBoxes", {
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
    allowNull: false,
    defaultValue: 100,
  },
  unitOfPrice: {
    type: DataTypes.ENUM("cents", "usd"),
    allowNull: false,
    defaultValue: "cents",
  },
  costPerUnit: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  reorderPoint: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  unitOfDimentions: {
    type: DataTypes.ENUM("cm", "inch"),
    allowNull: false,
    defaultValue: "cm",
  },
  dimensions: {
    // Length x Width x Height
    type: DataTypes.STRING,
    allowNull: false,
  },
  weightLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temperatureLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  waterproof: {
    type: DataTypes.ENUM("Yes", "No"),
    allowNull: false,
    defaultValue: "No",
  },
  expectedStockForToday: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  expectedStockForTomorrow: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

DeliveryBox.hasMany(DeliveryBoxBatch, {
  sourceKey: "id",
  foreignKey: "deliveryBoxId",
});

DeliveryBoxBatch.belongsTo(DeliveryBox, {
  foreignKey: "deliveryBoxId",
});

DeliveryBox.hasMany(ConsumptionLog, {
  sourceKey: "id",
  foreignKey: "deliveryBoxId",
});

ConsumptionLog.belongsTo(DeliveryBox, {
  foreignKey: "deliveryBoxId",
});

export default DeliveryBox;
