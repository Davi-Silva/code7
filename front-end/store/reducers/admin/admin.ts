import update from 'immutability-helper';

import initialState from '../intialState';

export default function admin(state = initialState.admin, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN_USER':
      return update(state, {
        data: { $set: {} },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_LOGIN_USER':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_LOGIN_USER':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.data }
      });
    case 'REQUEST_DECODE_TOKEN':
      return update(state, {
        data: { $set: {} },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_DECODE_TOKEN':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_DECODE_TOKEN':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'REQUEST_LOGOUT_USER':
      return update(state, {
        data: { $set: {} },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_LOGOUT_USER':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'FAILURE_LOGOUT_USER':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    default:
      return state;
  }
}
