import sequelize from 'sequelize';
import * as Service from '../types/Service';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';

type CreateOrder = {
  userId: number;
  productIds: number[];
};

async function getAll(): Service.Return {
  const orders = await OrderModel.findAll({
    include: { model: ProductModel, as: 'productIds', attributes: [] },
    raw: true,
    attributes: [
      'id',
      'userId',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    group: ['id'],
  });

  return { code: 'OK', data: orders };
}

async function create({ userId, productIds }: CreateOrder): Service.Return {
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return { code: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  const order = await OrderModel.create({ userId }, { raw: true });
  await order.setProductIds(productIds);

  return { code: 'CREATED', data: { userId, productIds } };
}

export default { getAll, create };
