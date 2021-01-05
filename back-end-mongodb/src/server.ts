import 'dotenv/config';
import express from 'express';

import { success } from '@utils/logger/logger';
import middlewares from '@middlewares/index';
import { connectDB } from './config/database';

import routes from '@routes/index';

const app = express();

middlewares(app);

routes(app);

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  success(`${process.env.APP_NAME} is listening on port: ${port}`);
});
