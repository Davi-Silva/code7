import { call, put } from 'redux-saga/effects';

const getClients = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/users`, {
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

export default function* asyncGetClientsApi() {
  try {
    const response = yield call(getClients);
    console.log('response:', response);

    if (response.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_CLIENTS',
        payload: { data: response.results }
      });
    } else {
      yield put({
        type: 'FAILURE_GET_CLIENTS',
        payload: { errors: response.errors }
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: 'FAILURE_GET_CLIENTS',
      payload: { errors: err.message }
    });
  }
}
