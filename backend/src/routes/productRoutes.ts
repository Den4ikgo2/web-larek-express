// eslint-disable-next-line import/no-import-module-exports
import express from 'express';

const router = express.Router();

const { getProducts, createProduct, getProduct } = require('../controllers/productController');

const { ValidateProductBody } = require('../middleware/validatons');

router.route('/').get(getProducts).post(ValidateProductBody, createProduct);
router.route('/:id').get(getProduct);

module.exports = router;
