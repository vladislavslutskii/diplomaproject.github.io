import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  getPosts,
  getSinglePost,
  setCardsList,
  setPostsLoading,
  setSinglePost,
  setSinglePostLoading,
} from "../reducers/postsreducer";
import Api from "../api";
import { PayloadAction } from "@reduxjs/toolkit";

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
  ]);
}
