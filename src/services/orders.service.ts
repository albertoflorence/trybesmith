import sequelize from 'sequelize';
import * as Service from '../types/Service';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function getAll(): Service.Return {
  const orders = await OrderModel.findAll({
    include: { model: ProductModel, as: 'productIds', attributes: [] },
    attributes: [
      'id',
      'userId',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    group: ['id'],
  });

  return { code: 'OK', data: orders };
}

export default { getAll };
