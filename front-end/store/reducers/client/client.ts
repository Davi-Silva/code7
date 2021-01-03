import update from 'immutability-helper';

import initialState from '../intialState';

export default function client(state = initialState.client, action) {
  switch (action.type) {
    case 'CLEAR_CLIENT':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'REQUEST_GET_CLIENT':
      return update(state, {
        data: { $set: {} },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_GET_CLIENT':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_GET_CLIENT':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.errors }
      });
    case 'REQUEST_CREATE_CLIENT':
      return update(state, {
        data: { $set: {} },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_CREATE_CLIENT':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_CREATE_CLIENT':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.errors }
      });
    default:
      return state;
  }
}
