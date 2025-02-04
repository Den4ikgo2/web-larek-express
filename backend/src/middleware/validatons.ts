import { celebrate, Joi, Segments } from 'celebrate';
import Product from '../models/product';

const ValidateProductBody = celebrate({
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

const ValidateOrdertBody = celebrate({
  body: Joi.object().keys({
    items: Joi.array()
      .items(
        Joi.string().custom(async (value, helpers) => {
          const product = await Product.findById(value);
          if (!product) {
            return helpers.message({ message: `Товар с _id ${value} не найден` });
          }
          if (product.price === null) {
            return helpers.message({ message: `Товар с _id ${value} не продается` });
          }
          return value;
        }),
      )
      .min(1)
      .required(),

    total: Joi.number().required(),

    payment: Joi.string().valid('card', 'online').required(),

    email: Joi.string().email().required(),

    phone: Joi.string().required(),

    address: Joi.string().required(),
  }),
});

export { ValidateProductBody, ValidateOrdertBody };
