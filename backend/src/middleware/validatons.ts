// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Joi, Segments } from 'celebrate';

// eslint-disable-next-line import/prefer-default-export
export const ValidateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      })
      .required(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().optional().allow(null),
  }),
});
