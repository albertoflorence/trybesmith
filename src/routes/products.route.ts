import { Router } from 'express';
import controller from '../controllers/products.controller';

const route = Router();

route.post('/', controller.create);
route.get('/', controller.getAll);

export default route;
