import { Model, DataTypes, Optional } from 'sequelize';
import { IIngredientBatch } from '../../interfaces/ingredientBatch.interface';
import sequelize from '..';

interface IngredientCreationAttributes extends Optional<IIngredientBatch, 'id'> {};

interface IngredientBatchInstance extends Model<IIngredientBatch, IngredientCreationAttributes>, IIngredientBatch {
  createdAt?: Date;
  updatedAt?: Date;
}

const IngredientBatch = sequelize.define<IngredientBatchInstance>('ingredientBatchs', {
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
        type: DataTypes.ENUM('gm', 'ml', 'piece', 'kg', 'litre'),
        allowNull: false,
      },
      currentStockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitOfPrice: {
        type: DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
      },
      purchasePrice: {
        type: DataTypes.FLOAT, 
        allowNull: false,
      },
      costPerUnit: {
        type: DataTypes.FLOAT,
      },
      expirationDate: {
        type: DataTypes.DATE,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      globalIngredientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

export default IngredientBatch;