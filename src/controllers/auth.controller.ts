import { Request, Response } from 'express';
import handleResponse from '../utils/handleResponse';
import authService from '../services/auth.service';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  handleResponse(res, result);
}

export default { login };
