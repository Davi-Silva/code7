export function loginUser(userObj) {
  return {
    type: 'REQUEST_LOGIN_USER',
    payload: {
      userObj
    }
  };
}

export function decodeAccessToken() {
  return {
    type: 'REQUEST_DECODE_TOKEN',
  };
}

export function logoutUser() {
  return {
    type: 'REQUEST_LOGOUT_USER',
  };
}

