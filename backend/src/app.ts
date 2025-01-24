import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dotenv = require('dotenv').config();

const connectDb = require('./config/dbConnection');

const errorHandler = require('./middleware/errorHandler');

const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

connectDb();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(requestLogger);
app.use('/product', require('./routes/productRoutes'));
app.use('/order', require('./routes/orderRoutes'));

app.use(errorLogger);
app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
