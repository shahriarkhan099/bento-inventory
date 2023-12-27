import { Model, DataTypes, Optional } from 'sequelize';
import { IPurchaseLog } from '../../interfaces/purchaseLog.interface';
import sequelize from '..';
import Supplier from '../supplier/supplier.model';
import Ingredient from '../ingredient/ingredient.model';

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
});

PurchaseLog.hasOne(Supplier, {
  sourceKey: 'id',
  foreignKey: 'purchaseId',
});

Supplier.belongsTo(PurchaseLog, {
  foreignKey: 'purchaseId',
});

PurchaseLog.hasMany(Ingredient, {
  sourceKey: 'id',
  foreignKey: 'purchaseId',
});

Ingredient.belongsTo(PurchaseLog, {
  foreignKey: 'purchaseId',
});

export default PurchaseLog;