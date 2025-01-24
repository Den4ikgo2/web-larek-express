// eslint-disable-next-line import/no-import-module-exports
import { Request, Response } from 'express';
// eslint-disable-next-line import/no-import-module-exports, import/no-extraneous-dependencies
import asyncHandler from 'express-async-handler';

const Product = require('../models/product');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

  if (!products) {
    res.status(404);
    throw new Error('Маршрут не найден');
  }

  res.status(200).json({
    items: products,
    total: products.length,
  });
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Маршрут не найден');
  }

  res.status(200).json({
    Items: [product],
    total: 1,
  });
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    description,
    image,
    title,
    category,
    price,
  } = req.body;

  const { _id, ...imageData } = image;

  const titleProduct = await Product.findOne({ title });

  if (titleProduct) {
    res.status(409);
    throw new Error('Ошибка при создании товара с уже существующим полем title');
  }

  const product = await Product.create({
    title,
    image: imageData,
    category,
    description,
    price,
  });

  if (!product) {
    res.status(404);
    throw new Error('Маршрут не найден');
  }

  res.status(201).json({ product });
});

module.exports = { getProducts, createProduct, getProduct };
