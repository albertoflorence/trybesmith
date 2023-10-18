import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import handleResponse from '../utils/handleResponse';

async function getAll(req: Request, res: Response) {
  const result = await ordersService.getAll();
  handleResponse(res, result);
}

async function create(req: Request, res: Response) {
  const { userId, productIds } = req.body;
  const result = await ordersService.create({ userId, productIds });
  handleResponse(res, result);
}

export default { getAll, create };
