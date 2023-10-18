import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const handleValidate = (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validate = schema.validate(req.body);
    if (validate.error) {
      const status = validate.error.details[0].type === 'any.required' ? 400 : 422;
      res.status(status).json({ message: validate.error.message });
      return;
    }

    next();
  };

export default handleValidate;
