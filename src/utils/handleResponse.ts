import { Response } from 'express';
import { Result } from '../types/Service';
import httpStatus from './httpStatus';

export default function handleResponse(res: Response, { code, data }: Result): void {
  res.status(httpStatus(code)).json(data);
}
