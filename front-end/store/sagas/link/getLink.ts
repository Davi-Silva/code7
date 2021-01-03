import { call, put } from "redux-saga/effects";

const getLink = async (id) => {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/link/link?id=${id}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};

export default function* asyncGetLinkApi(action) {
  try {
    const response = yield call(getLink, action.payload.id);

    if (response.status_code === 200) {
      yield put({ type: "SUCCESS_GET_LINK", payload: { data: response } });
    } else {
      yield put({ type: "FAILURE_GET_LINK" });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: "FAILURE_GET_LINK" });
  }
}
