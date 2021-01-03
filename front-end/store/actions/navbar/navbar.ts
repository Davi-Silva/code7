export function openLoginForm() {
  return {
    type: 'OPEN_LOGIN_FORM',
  };
}

export function closeLoginForm() {
  return {
    type: 'CLOSE_LOGIN_FORM',
  };
}

export function toggleLoginForm(openLoginForm) {
  return {
    type: 'TOGGLE_LOGIN_FORM',
    payload: {
      openLoginForm
    }
  };
}

export function openRegisterForm() {
  return {
    type: 'OPEN_REGISTER_FORM',
  };
}

export function closeRegisterForm() {
  return {
    type: 'CLOSE_REGISTER_FORM',
  };
}

export function toggleRegisterForm(openRegisterForm) {
  return {
    type: 'TOGGLE_REGISTER_FORM',
    payload: {
      openRegisterForm
    }
  };
}

export function openResetPasswordForm() {
  return {
    type: 'OPEN_RESET_PASSWORD_FORM',
  };
}

export function closeResetPasswordForm() {
  return {
    type: 'CLOSE_RESET_PASSWORD_FORM',
  };
}

export function toggleResetPasswordForm(openResetPasswordForm) {
  return {
    type: 'TOGGLE_RESET_PASSWORD_FORM',
    payload: {
      openResetPasswordForm
    }
  };
}

export function closeUserModal() {
  return {
    type: 'CLOSE_USER_MODAL',
  };
}

export function toggleUserModal(openUserModal) {
  console.log('openUserModal:', openUserModal)
  return {
    type: 'TOGGLE_USER_MODAL',
    payload: {
      openUserModal
    }
  };
}

export function openUserDrawer() {
  return {
    type: 'OPEN_USER_DRAWER',
  };
}

export function closeUserDrawer() {
  return {
    type: 'CLOSE_USER_DRAWER',
  };
}
