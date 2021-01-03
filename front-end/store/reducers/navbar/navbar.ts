import update from 'immutability-helper';

import initialState from '../intialState';

export default function navbar(state = initialState.navbar, action) {
  switch (action.type) {
    case 'OPEN_LOGIN_FORM':
      return update(state, {
        openLoginForm: { $set: true }
      });
    case 'CLOSE_LOGIN_FORM':
      return update(state, {
        openLoginForm: { $set: false }
      });
    case 'TOGGLE_LOGIN_FORM':
      return update(state, {
        openLoginForm: { $set: !action.payload.openLoginForm }
      });
    case 'OPEN_REGISTER_FORM':
      return update(state, {
        openRegisterForm: { $set: true }
      });
    case 'CLOSE_REGISTER_FORM':
      return update(state, {
        openRegisterForm: { $set: false }
      });
    case 'TOGGLE_REGISTER_FORM':
      return update(state, {
        openRegisterForm: { $set: !action.payload.openRegisterForm }
      });
    case 'OPEN_RESET_PASSWORD_FORM':
      return update(state, {
        openResetPasswordForm: { $set: true }
      });
    case 'CLOSE_RESET_PASSWORD_FORM':
      return update(state, {
        openResetPasswordForm: { $set: false }
      });
    case 'TOGGLE_RESET_PASSWORD_FORM':
      return update(state, {
        openResetPasswordForm: { $set: !action.payload.openResetPasswordForm }
      });
    case 'CLOSE_USER_MODAL':
      return update(state, {
        openUserModal: { $set: false }
      });
    case 'TOGGLE_USER_MODAL':
      return update(state, {
        openUserModal: { $set: !action.payload.openUserModal }
      });
    case 'OPEN_USER_DRAWER':
      return update(state, {
        openUserDrawer: { $set: true }
      });
    case 'CLOSE_USER_DRAWER':
      return update(state, {
        openUserDrawer: { $set: false }
      });
    default:
      return state;
  }
}
