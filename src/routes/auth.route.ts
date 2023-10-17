import { Router } from 'express';
import controller from '../controllers/auth.controller';

const route = Router();

route.post('/login', controller.login);

export default route;
