import { Model, DataTypes, Optional } from 'sequelize';
import { IDeliveryBox } from '../../interfaces/deliveryBox.interface';
import sequelize from '..';

interface DeliveryBoxCreationAttributes extends Optional<IDeliveryBox, 'id'> {};

interface DeliveryBoxInstance extends Model<IDeliveryBox, DeliveryBoxCreationAttributes>, IDeliveryBox {
  createdAt?: Date;
  updatedAt?: Date;
}

const DeliveryBox = sequelize.define<DeliveryBoxInstance>('deliveryBoxes', {
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
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weightLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperatureLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      waterproof: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      specialInstructions: {
        type: DataTypes.TEXT,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

export default DeliveryBox;