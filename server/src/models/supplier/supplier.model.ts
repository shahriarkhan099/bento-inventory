import { Model, DataTypes, Optional } from 'sequelize';
import { ISupplier } from '../../interfaces/supplier.interface';
import sequelize from '..';

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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

export default Supplier;