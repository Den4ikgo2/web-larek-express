import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDb from './config/dbConnection';
import errorHandler from './middleware/errorHandler';
import { requestLogger, errorLogger } from './middleware/logger';
import routes from './routes/index';

dotenv.config();
connectDb();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
  console.log('listening on port 3000');
});
