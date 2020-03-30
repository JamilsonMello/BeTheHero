import { celebrate, Joi, Segments } from 'celebrate';

export const incidentIndexValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().required(),
  })
});

export const incidentStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().alphanum().length(8).required(),
  }).unknown(),
});

export const incidentDeleteValidator = celebrate ({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().alphanum().length(8).required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
});
