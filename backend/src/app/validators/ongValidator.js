import { celebrate, Joi, Segments } from 'celebrate';

export const ongStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().max(2).required(),
  }),
});
