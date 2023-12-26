import { Model, DataTypes, Optional } from 'sequelize';
import { IPurchaseLog } from '../../interfaces/purchaseLog.interface';
import sequelize from '..';

interface PurchaseLogCreationAttributes extends Optional<IPurchaseLog, 'id'> {};

interface PurchaseLogInstance extends Model<IPurchaseLog, PurchaseLogCreationAttributes>, IPurchaseLog {
  createdAt?: Date;
  updatedAt?: Date;
}

const PurchaseLog = sequelize.define<PurchaseLogInstance>('purchaseLogs', {
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit: {
        type: DataTypes.ENUM('gm', 'ml', 'piece'),
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.DATE,
      },
      deliveryDate: {
        type: DataTypes.DATE,
      },
      unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  );

export default PurchaseLog;