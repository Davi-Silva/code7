import { all, takeLatest } from 'redux-saga/effects';

import GetClient from './client/getClient';

import GetClients from './clients/getClients';
import GetClientsWithDebts from './clients/getClientsWithDebts';

import LoginUser from './user/loginUser';
import decodeAccessToken from './user/decodeAccessToken';
import LogoutUser from './user/logoutUser';

export default function* root() {
  yield all([
    takeLatest('REQUEST_GET_CLIENT', GetClient),

    takeLatest('REQUEST_GET_CLIENTS', GetClients),
    takeLatest('REQUEST_GET_CLIENTS_WITH_DEBTS', GetClientsWithDebts),

    takeLatest('REQUEST_LOGIN_USER', LoginUser),
    takeLatest('REQUEST_DECODE_TOKEN', decodeAccessToken),
    takeLatest('REQUEST_LOGOUT_USER', LogoutUser)
  ]);
}
