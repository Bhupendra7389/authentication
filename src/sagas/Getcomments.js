import axios from "axios";
import { put } from "redux-saga/effects";

export default function* getCommentAsync(action) {
  let posts = yield axios.get("/api/getcomments");

  yield put({ type: "SHOW_DATA_ASYNC", payload: posts.data });
}
