import { celebrate, Joi, Segments } from 'celebrate';

export const profileIndexValidator = celebrate ({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().alphanum().length(8).required(),
  }).unknown(),
});
