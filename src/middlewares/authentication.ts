import { NextFunction, Request, Response } from 'express';
import tokenUtil from '../utils/tokenUtil';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split('Bearer ')[1];
  const payload = tokenUtil.verify(token);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
}
