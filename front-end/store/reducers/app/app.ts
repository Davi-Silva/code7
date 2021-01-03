import update from 'immutability-helper';

import initialState from '../intialState';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case 'SET_IS_MOBILE':
      return update(state, {
        isMobile: { $set: action.payload.isMobile }
      });
    case 'GET_DIMENSIONS':
      return update(state, {
        dimensions: { $set: action.payload.dimensions }
      });
    case 'RESET_WARNINGS':
      return update(state, {
        warnings: { $set: [] }
      });
    case 'SET_WARNINGS':
      if (
        state.warnings.filter(
          (warningMessage) => warningMessage === action.payload.warning
        ).length === 0
      ) {
        return update(state, {
          warnings: { $set: state.warnings.concat(action.payload.warning) }
        });
      }
    default:
      return state;
  }
}
