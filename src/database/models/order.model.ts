import { DataTypes, HasManyHasAssociationMixin, Model, Optional } from 'sequelize';
import db from './index';
import { Order } from '../../types/Order';
import { Product } from '../../types/Product';

type InferOrderCreationAttributes = Optional<Order, 'id'>;
export type OrderSequelizeModel = Model<Order, InferOrderCreationAttributes>;

class OrderModel extends Model<Order, InferOrderCreationAttributes> {
  public id!: number;

  declare username: string;

  declare vocation: string;

  declare level: number;

  declare password: string;

  declare setProductIds: HasManyHasAssociationMixin<Product, number[]>;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
    underscored: true,
  },
);

export default OrderModel;
