import { call, put } from 'redux-saga/effects';

const getLink = async (userId: string) => {
  const res = await fetch(`${process.env.API_ENDPOINT}/users/id/${userId}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
};

export default function* asyncGeClientApi(action) {
  try {
    const response = yield call(getLink, action.payload.userId);

    if (response.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_CLIENT',
        payload: { data: response.results }
      });
    } else {
      yield put({
        type: 'FAILURE_GET_CLIENT',
        ppayload: { errors: response.errors }
      });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: 'FAILURE_GET_CLIENT' });
  }
}
