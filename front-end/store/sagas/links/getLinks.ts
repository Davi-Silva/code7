import { call, put } from "redux-saga/effects";

const getLinks = async (userId) => {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/links/user/${userId}`,
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
    const response = yield call(getLinks, action.payload.userId);

    if (response.status_code === 200) {
      yield put({
        type: "SUCCESS_GET_LINKS",
        payload: { data: response.results },
      });
    } else {
      yield put({ type: "FAILURE_GET_LINKS" });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: "FAILURE_GET_LINKS" });
  }
}
