import { celebrate, Joi, Segments } from 'celebrate';

export const sessionPostValidator = celebrate ({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().alphanum().length(8).required()
  })
});
