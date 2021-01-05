import { call, put } from 'redux-saga/effects';

const getClientsWithDebts = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/users/debts`, {
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

export default function* asyncGetClientsWithDebtsApi() {
  try {
    const response = yield call(getClientsWithDebts);
    console.log('response:', response);

    if (response.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_CLIENTS_WITH_DEBTS',
        payload: { data: response.results }
      });
    } else {
      yield put({
        type: 'FAILURE_GET_CLIENTS_WITH_DEBTS',
        payload: { errors: response.errors }
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: 'FAILURE_GET_CLIENTS_WITH_DEBTS',
      payload: { errors: err.message }
    });
  }
}
