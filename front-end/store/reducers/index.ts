import { combineReducers } from 'redux';

import client from './client/client';
import clients from './clients/clients';
import admin from './admin/admin';
import navbar from './navbar/navbar';
import app from './app/app';

export default combineReducers({
  client,
  clients,
  admin,
  navbar,
  app
});
