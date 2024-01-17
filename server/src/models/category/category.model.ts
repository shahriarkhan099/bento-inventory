import { Model, DataTypes, Optional } from "sequelize";
import { ICategory } from "../../interfaces/category.interface";
import sequelize from "..";
import Ingredient from "../ingredient/ingredient.model";
import WasteLog from "../wasteLog/wasteLog.model";

interface CategoryCreationAttributes extends Optional<ICategory, "id"> {}

interface CategoryInstance extends Model<ICategory, CategoryCreationAttributes>, ICategory {
  createdAt?: Date;
  updatedAt?: Date;
}

const Category = sequelize.define<CategoryInstance>("categories", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniqueCategoryId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Category.hasMany(Ingredient, {
  sourceKey: "id",
  foreignKey: "categoryId",
});

Ingredient.belongsTo(Category, {
  foreignKey: "categoryId",
});

export default Category;
