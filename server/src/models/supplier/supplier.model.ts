import { Model, DataTypes, Optional } from 'sequelize';
import { ISupplier } from '../../interfaces/supplier.interface';
import sequelize from '..';
import IngredientBatch from '../ingredientBatch/ingredientBatch.model';
import Order from '../order/order.model';

interface SupplierCreationAttributes extends Optional<ISupplier, 'id'> {};

interface SupplierInstance extends Model<ISupplier, SupplierCreationAttributes>, ISupplier {
  createdAt?: Date;
  updatedAt?: Date;
}

const Supplier = sequelize.define<SupplierInstance>('suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.ENUM('Premium', 'Preferred', 'Standard', 'Budget', 'New'),
        allowNull: false,
        defaultValue: 'New',
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

Supplier.hasMany(IngredientBatch, {
  sourceKey: 'id',
  foreignKey: 'supplierId',
});

IngredientBatch.belongsTo(Supplier, {
  foreignKey: 'supplierId',
});

Supplier.hasMany(Order, {
  sourceKey: 'id',
  foreignKey: 'supplierId',
});

Order.belongsTo(Supplier, {
  foreignKey: 'supplierId',
});


export default Supplier;