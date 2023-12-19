import { Model, DataTypes, Optional } from 'sequelize';
import { IIngredient } from '../../interfaces/ingredient.interface';
import sequelize from '..';
// import Category from '../category/category.model';
// import Supplier from '../supplier/supplier.model';

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
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stockQuantity: {
        type: DataTypes.INTEGER,
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
      imageUrl: {
        type: DataTypes.STRING,
      },
      idealStoringTemperature: {
        type: DataTypes.INTEGER,
      },
      receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
});

// Ingredient.hasOne(Category, {
//     sourceKey: 'id',
//     foreignKey: 'ingredientId',
// });
  
// Category.belongsTo(Ingredient, {
//     foreignKey: 'ingredientId',
// })
  
// Ingredient.hasOne(Supplier, {
//     sourceKey: 'id',
//     foreignKey: 'ingredientId',
// });
  
// Supplier.belongsTo(Ingredient, {
//     foreignKey: 'ingredientId',
// });

export default Ingredient;