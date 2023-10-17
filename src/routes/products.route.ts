import { Router } from 'express';
import controller from '../controllers/products.controller';
import validate from '../middlewares/products.validate';

const route = Router();

route.post('/', validate.create, controller.create);
route.get('/', controller.getAll);

export default route;
