import JOI from 'joi';
import handleValidate from '../utils/handleValidate';

const schema = JOI.object({
  name: JOI.string().min(3).required(),
  price: JOI.string().min(3).required(),
  orderId: JOI.number(),
});

const create = handleValidate(schema);

export default { create };
