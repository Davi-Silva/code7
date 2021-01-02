import { Application } from 'express';

import adminsAuth from './admins/auth';
import users from './users';
import debts from './debts';

export default (app: Application): void => {
  app.use('/admins/auth', adminsAuth);
  app.use('/users', users);
  app.use('/debts', debts);
};
