import { Model, DataTypes, Optional } from "sequelize";
import { IConsumptionLog } from "../../interfaces/consumptionLog.interface";
import sequelize from "..";

interface ConsumptionLogCreationAttributes
  extends Optional<IConsumptionLog, "id"> {}

interface ConsumptionLogInstance extends Model<IConsumptionLog, ConsumptionLogCreationAttributes>, IConsumptionLog {
  createdAt?: Date;
  updatedAt?: Date;
}

const ConsumptionLog = sequelize.define<ConsumptionLogInstance>("consumptionLogs", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    itemName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    itemType: {
      type: DataTypes.ENUM('ingredient', 'box'),
      allowNull: false,
      defaultValue: 'ingredient',
    },
    unitOfStock: {
      type: DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderType: {
      type: DataTypes.ENUM('in-house', 'delivery', 'pickup'),
      allowNull: false,
    },
    costPerUnit: {
      type: DataTypes.FLOAT,
    },
    consumedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

export default ConsumptionLog;
