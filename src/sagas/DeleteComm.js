import axios from "axios";
import { put } from "@redux-saga/core/effects";
export default function* deleteCommentAsync(action) {
  yield axios.delete(
    "http://localhost:8080/api/deleteUser/" + action.req.postId
  );
  yield put({ type: "GET_COMMENT" });
}
