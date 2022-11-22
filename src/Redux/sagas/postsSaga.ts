import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  getPosts,
  setCardsList,
  setPostsLoading,
} from "../reducers/postsreducer";
import Api from "../api";

function* getMyPostsWorker() {
  yield put(setPostsLoading(true));
  const { data, status, problem } = yield call(Api.getPostsList);
  if (status === 200 && data) {
    yield put(setCardsList(data));
  } else {
    console.log(problem);
  }
  yield put(setPostsLoading(false));
}

export default function* postsSagaWatcher() {
  yield all([takeLatest(getPosts, getMyPostsWorker)]);
}
