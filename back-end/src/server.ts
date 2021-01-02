import 'dotenv/config';
import '@database/index';
import express from 'express';

import { success } from '@utils/logger/logger';
import middlewares from '@middlewares/index';

import routes from '@routes/index';

const app = express();

middlewares(app);

routes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  success(`${process.env.APP_NAME} is listening on port: ${port}`);
});
