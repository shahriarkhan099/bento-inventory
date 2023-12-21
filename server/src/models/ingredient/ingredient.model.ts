import { Model, DataTypes, Optional } from 'sequelize';
import { IIngredient } from '../../interfaces/ingredient.interface';
import sequelize from '..';

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
        type: DataTypes.ENUM('gm', 'ml', 'piece'),
        allowNull: false,
      },
      currentStockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitOfPrice: {
        type: DataTypes.ENUM('cents'),
        allowNull: false,
      },
      purchasePrice: {
        type: DataTypes.FLOAT, 
        allowNull: false,
      },
      costPerUnit: {
        type: DataTypes.FLOAT,
      },
      caloriesPerUnit: {
        type: DataTypes.INTEGER,
      },
      expirationDate: {
        type: DataTypes.DATE,
      },
      reorderPoint: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      unitOfIdealStoringTemperature: {
        type: DataTypes.ENUM('Celsius', 'Fahrenheit'),
        allowNull: false,
        defaultValue: 'Celsius', 
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
        allowNull: false,
      },
});


export default Ingredient;