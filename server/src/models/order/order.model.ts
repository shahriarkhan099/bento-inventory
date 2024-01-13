import { Model, DataTypes, Optional } from 'sequelize';
import { IOrder } from '../../interfaces/order.interface';
import sequelize from '..';
import IngredientBatch from '../ingredientBatch/ingredientBatch.model';
import DeliveryBoxBatch from '../deliveryBoxBatch/deliveryBoxBatch.model';

interface OrderCreationAttributes extends Optional<IOrder, 'id'> {};

interface OrderInstance extends Model<IOrder, OrderCreationAttributes>, IOrder {
  createdAt?: Date;
  updatedAt?: Date;
}

const Order = sequelize.define<OrderInstance>('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled', 'suggestions'),
        allowNull: false,
        defaultValue: 'pending',
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      scheduleTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
});

Order.hasMany(IngredientBatch, {
    sourceKey: 'id',
    foreignKey: 'orderId'
});

IngredientBatch.belongsTo(Order, {
    foreignKey: 'orderId'
});

Order.hasMany(DeliveryBoxBatch, {
  sourceKey: 'id',
  foreignKey: 'orderId'
});

DeliveryBoxBatch.belongsTo(Order, {
  foreignKey: 'orderId'
});

export default Order;