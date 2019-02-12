import axios from "axios";
import { put } from "redux-saga/effects";
export default function* addMemberAsync() {
  let posts = yield axios.get("/api/getUser");

  yield put({ type: "ADD_MEM", payload: posts.data });
}
