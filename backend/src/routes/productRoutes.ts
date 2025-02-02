import express from 'express';
import { getProducts, createProduct, getProduct } from '../controllers/productController';
import { ValidateProductBody } from '../middleware/validatons';

const router = express.Router();

router.route('/').get(getProducts).post(ValidateProductBody, createProduct);
router.route('/:id').get(getProduct);

export default router;
