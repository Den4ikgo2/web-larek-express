// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';
// eslint-disable-next-line import/no-import-module-exports, import/no-extraneous-dependencies
import asyncHandler from 'express-async-handler';
// eslint-disable-next-line import/no-import-module-exports, import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

const Product = require('../models/product');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, consistent-return
const createOrder = asyncHandler(async (req:Request, res:Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    total,
    items,
    payment,
    email,
    phone,
    address,
  } = req.body;

  if (items.length === 0) {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  let totalPrice:number = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    // eslint-disable-next-line no-await-in-loop
    const product = await Product.findById(item);
    if (!product || product.price === null) {
      res.status(400);
      throw new Error('Переданы некорректные данные в методы создания товара, заказа');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    totalPrice += product.price;
  }

  if (totalPrice !== total) {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  const validPayments = {
    CARD: 'card',
    ONLINE: 'online',
  };
  if (payment !== validPayments.CARD && payment !== validPayments.ONLINE) {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  if (!phone || typeof phone !== 'string') {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  if (!address || typeof address !== 'string') {
    res.status(400);
    throw new Error('Переданы некорректные данные в методы создания товара, заказа');
  }

  res.status(200).json({
    id: faker.database.mongodbObjectId(),
    total,
  });
});

module.exports = { createOrder };
