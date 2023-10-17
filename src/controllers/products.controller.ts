import { Request, Response } from 'express';
import productsService from '../services/products.service';
import handleResponse from '../utils/handleResponse';

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const result = await productsService.create({ name, price, orderId });
  handleResponse(res, result);
}

export default { create };
