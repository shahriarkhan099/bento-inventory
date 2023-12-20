import { Model, DataTypes, Optional } from 'sequelize';
import { ICategory } from '../../interfaces/category.interface';
import sequelize from '..';

interface CategoryCreationAttributes extends Optional<ICategory, 'id'> {};

interface CategoryInstance extends Model<ICategory, CategoryCreationAttributes>, ICategory {
  createdAt?: Date;
  updatedAt?: Date;
}

const Category = sequelize.define<CategoryInstance>('categories', {
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
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      storageShelf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storageType: {
        type: DataTypes.ENUM('refrigerated', 'nonrefrigerated'),
        allowNull: false,
        defaultValue: 'refrigerated',
      },
      description: {
        type: DataTypes.TEXT,
      },
      vegetarian: {
        type: DataTypes.BOOLEAN,
      },
      vegan: {
        type: DataTypes.BOOLEAN,
    }
});

export default Category;