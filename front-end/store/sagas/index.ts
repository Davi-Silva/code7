import {all, takeLatest} from 'redux-saga/effects';

import GetLink from './link/getLink';
import CreateLink from './link/createLink';

import GetLinks from './links/getLinks';

import LoginUser from './user/loginUser';
import decodeAccessToken from './user/decodeAccessToken';
import LogoutUser from './user/logoutUser';

export default function* root() {
  yield all([
    takeLatest('REQUEST_GET_LINK', GetLink),
    takeLatest('REQUEST_CREATE_LINK', CreateLink),

    takeLatest('REQUEST_GET_LINKS', GetLinks),

    takeLatest('REQUEST_LOGIN_USER', LoginUser),
    takeLatest('REQUEST_DECODE_TOKEN', decodeAccessToken),
    takeLatest('REQUEST_LOGOUT_USER', LogoutUser),
  ])
}