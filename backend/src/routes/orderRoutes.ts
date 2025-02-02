import express from 'express';
import createOrder from '../controllers/orderController';
import { ValidateOrdertBody } from '../middleware/validatons';

const router = express.Router();

router.route('/').post(ValidateOrdertBody, createOrder);

export default router;
