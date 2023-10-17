import { NextFunction, Request, Response } from 'express';
import JOI from 'joi';

const schema = JOI.object({
  name: JOI.string().min(3).required(),
  price: JOI.string().min(3).required(),
  orderId: JOI.number(),
});

function create(req: Request, res: Response, next: NextFunction) {
  const validate = schema.validate(req.body);
  if (validate.error) {
    const status = validate.error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(status).json({ message: validate.error.message });
  }

  next();
}

export default { create };
