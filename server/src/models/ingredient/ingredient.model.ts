import { Model, DataTypes, Optional } from 'sequelize';
import { IIngredient } from '../../interfaces/ingredient.interface';
import sequelize from '..';
import IngredientBatch from '../ingredientBatch/ingredientBatch.model';
import Category from '../category/category.model';

interface IngredientCreationAttributes extends Optional<IIngredient, 'id'> {};

interface IngredientInstance extends Model<IIngredient, IngredientCreationAttributes>, IIngredient {
  createdAt?: Date;
  updatedAt?: Date;
}

const Ingredient = sequelize.define<IngredientInstance>('ingredients', {
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
      costPerUnit: {
        type: DataTypes.FLOAT,
      },
      caloriesPerUnit: {
        type: DataTypes.INTEGER,
      },
      reorderPoint: {
        type: DataTypes.INTEGER,
      },
      perishable: {
        type: DataTypes.BOOLEAN,
      },
      description: {
        type: DataTypes.TEXT,
      },
      unitOfIdealStoringTemperature: {
        type: DataTypes.ENUM('Celsius', 'Fahrenheit'),
        allowNull: false,
      },
      idealStoringTemperature: {
        type: DataTypes.INTEGER,
      },
      expectedStockForToday: {
        type: DataTypes.INTEGER,
      },
      expectedStockForTomorrow: {
        type: DataTypes.INTEGER,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
      },
});

Ingredient.hasMany(IngredientBatch, {
    sourceKey: 'id',
    foreignKey: 'ingredientId',
});
  
IngredientBatch.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});

export default Ingredient;