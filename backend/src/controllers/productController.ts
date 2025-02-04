import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product';
import HttpStatus from '../constants';

const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find();

  if (!products) {
    res.status(HttpStatus.NOT_FOUND);
    throw new Error('Маршрут не найден');
  }

  res.status(HttpStatus.OK).json({
    items: products,
    total: products.length,
  });
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(HttpStatus.NOT_FOUND);
    throw new Error('Маршрут не найден');
  }

  res.status(HttpStatus.OK).json({
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

  const product = await Product.create({
    title,
    image: imageData,
    category,
    description,
    price,
  });

  if (!product) {
    res.status(HttpStatus.NOT_FOUND);
    throw new Error('Маршрут не найден');
  }

  res.status(HttpStatus. CREATE_OK).json({ product });
});

export { getProducts, createProduct, getProduct };
