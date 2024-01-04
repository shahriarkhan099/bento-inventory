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
    ingredientName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unitOfStock: {
      type: DataTypes.ENUM("gm", "ml", "piece"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderType: {
      type: DataTypes.ENUM("inhouse", "marketplace"),
      allowNull: false,
    },
    costPerUnit: {
      type: DataTypes.FLOAT,
    },
    consumedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ingredientId: {
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
