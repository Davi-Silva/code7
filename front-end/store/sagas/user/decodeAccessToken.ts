import { call, put } from 'redux-saga/effects';

const getUserInfoFromToken = async (token: string) => {
  const res = await fetch(
    `${process.env.API_ENDPOINT}/admins/auth/login/decode/token`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data = await res.json();
  return data;
};

export default function* asyncDecodeTokenApi() {
  try {
    if (window.localStorage.getItem('accessToken') !== undefined) {
      const accessToken = window.localStorage.getItem('accessToken');
      const finalUserInfoResponse = yield call(
        getUserInfoFromToken,
        accessToken
      );

      if (
        !(
          finalUserInfoResponse.status_code === 400 ||
          finalUserInfoResponse.status_code === 500
        )
      ) {
        yield put({
          type: 'SUCCESS_DECODE_TOKEN',
          payload: { data: finalUserInfoResponse.results }
        });
      }
    }
  } catch (err) {
    console.error(err);
    yield put({ type: 'FAILURE_DECODE_TOKEN' });
  }
}
