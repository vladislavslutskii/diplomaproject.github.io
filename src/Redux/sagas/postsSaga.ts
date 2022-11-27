import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  getPosts,
  getPostsCount,
  getSinglePost,
  setCardsCount,
  setCardsList,
  setPostsLoading,
  setSinglePost,
  setSinglePostLoading,
} from "../reducers/postsreducer";
import Api from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetPostsPayload } from "../../Utils";

function* getMyPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsLoading(true));
  const { _start, _sort } = action.payload;
  const { data, status, problem } = yield call(Api.getPostsList, _start, _sort);
  if (status === 200 && data) {
    yield put(setCardsList(data));
  } else {
    console.log(problem);
  }
  yield put(setPostsLoading(false));
}
function* getPostsCountWorker() {
  const { data, status, problem } = yield call(Api.getPostsCount);
  if (status === 200 && data) {
    yield put(setCardsCount(data));
  } else {
    console.log(problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const { data, status, problem } = yield call(Api.getPost, action.payload);
  if (status === 200 && data) {
    console.log(data);
    yield put(setSinglePost(data));
  } else {
    console.log(problem);
  }
  yield put(setSinglePostLoading(false));
}

export default function* postsSagaWatcher() {
  yield all([
    takeLatest(getPosts, getMyPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getPostsCount, getPostsCountWorker),
  ]);
}
