import update from 'immutability-helper';

import initialState from '../intialState';

export default function clients(state = initialState.clients, action) {
  switch (action.type) {
    case 'REQUEST_GET_CLIENTS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_GET_CLIENTS':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_GET_CLIENTS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.errors }
      });
    case 'REQUEST_GET_CLIENTS_WITH_DEBTS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: true },
        fetched: { $set: false },
        errors: { $set: [] }
      });
    case 'SUCCESS_GET_CLIENTS_WITH_DEBTS':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    case 'FAILURE_GET_CLIENTS_WITH_DEBTS':
      return update(state, {
        data: { $set: [] },
        loading: { $set: false },
        fetched: { $set: false },
        errors: { $set: action.payload.errors }
      });
    case 'REMOVE_CLIENT':
      const clients: any[] = state.data.filter(
        (client) => client.id !== action.payload.clientId
      );

      return update(state, {
        data: { $set: clients },
        loading: { $set: false },
        fetched: { $set: true },
        errors: { $set: [] }
      });
    default:
      return state;
  }
}
