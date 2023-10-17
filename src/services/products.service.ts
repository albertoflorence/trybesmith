import { Optional } from 'sequelize';
import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import * as Service from '../types/Service';

async function create(product: Optional<Product, 'id'>): Service.Return {
  const { dataValues } = await ProductModel.create(product);
  return { code: 'CREATED', data: dataValues };
}

async function getAll(): Service.Return {
  const products = await ProductModel.findAll();
  return { code: 'OK', data: products };
}

export default { create, getAll };
