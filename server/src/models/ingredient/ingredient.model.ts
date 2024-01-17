import { Model, DataTypes, Optional } from 'sequelize';
import { IIngredient } from '../../interfaces/ingredient.interface';
import sequelize from '..';
import IngredientBatch from '../ingredientBatch/ingredientBatch.model';
import ConsumptionLog from '../consumptionLog/consumptionLog.model';
import WasteLog from '../wasteLog/wasteLog.model';

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
      uniqueIngredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredientName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      unitOfStock: {
        type: DataTypes.ENUM('gm', 'ml', 'kg', 'litre', 'piece', 'bottle', 'packet', 'can'),
        allowNull: false,
      },
      currentStockQuantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      unitOfPrice: {
        type: DataTypes.ENUM('cents', 'usd'),
        allowNull: false,
        defaultValue: 'cents',
      },
      costPerUnit: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      caloriesPerUnit: {
        type: DataTypes.FLOAT,
      },
      reorderPoint: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      liquid: {
        type: DataTypes.ENUM('Yes', 'No'),
        allowNull: false,
      },
      perishable: {
        type: DataTypes.ENUM('Yes', 'No'),
        allowNull: false,
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
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      expectedStockForTomorrow: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
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

Ingredient.hasMany(ConsumptionLog, {
  sourceKey: 'id',
  foreignKey: 'ingredientId',
});

ConsumptionLog.belongsTo(Ingredient, {
  foreignKey: 'ingredientId',
});

Ingredient.hasMany(WasteLog, {
  sourceKey: 'id',
  foreignKey: 'ingredientId',
});

WasteLog.belongsTo(Ingredient, {
  foreignKey: 'ingredientId',
});

export default Ingredient;