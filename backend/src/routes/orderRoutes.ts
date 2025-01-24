// eslint-disable-next-line import/no-import-module-exports
import express from 'express';

const router = express.Router();

const { createOrder } = require('../controllers/orderController');

router.route('/').post(createOrder);

module.exports = router;
