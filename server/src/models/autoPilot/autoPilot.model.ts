import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "..";
import { IAutoPilot } from "../../interfaces/autoPilot.interface";

interface AutoPilotCreationAttributes extends Optional<IAutoPilot, "id"> {}

interface AutoPilotInstance extends Model<IAutoPilot, AutoPilotCreationAttributes>, IAutoPilot {
  createdAt?: Date;
  updatedAt?: Date;
}

const AutoPilot = sequelize.define<AutoPilotInstance>("autoPilots", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  autoPilotSwitch: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default AutoPilot;
