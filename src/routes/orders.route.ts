import { Router } from 'express';
import controller from '../controllers/orders.controller';
import authorization from '../middlewares/authentication';
import validate from '../middlewares/orders.validate';

const route = Router();

route.get('/', controller.getAll);
route.post('/', authorization, validate.create, controller.create);

export default route;
