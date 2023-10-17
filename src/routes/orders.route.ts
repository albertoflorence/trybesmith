import { Router } from 'express';
import controller from '../controllers/orders.controller';

const route = Router();

route.get('/', controller.getAll);

export default route;
