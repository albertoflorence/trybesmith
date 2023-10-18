import JOI from 'joi';
import handleValidate from '../utils/handleValidate';

const schema = JOI.object({
  userId: JOI.number().options({ convert: false }).required(),
  productIds: JOI.array()
    .items(JOI.number())
    .min(1)
    .message('"productIds" must include only numbers')
    .required(),
});

const create = handleValidate(schema);

export default { create };
