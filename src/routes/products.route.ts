import { Router } from 'express';
import controller from '../controllers/products.controller';

const route = Router();

route.post('/', controller.create);

export default route;
