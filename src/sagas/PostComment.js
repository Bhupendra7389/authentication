import axios from "axios";
import { put } from "redux-saga/effects";

export default function* postCommentAsync(action) {
  yield axios
    .put("http://localhost:8080/api/comment/" + action.commentData.postId, {
      comments: action.commentData.body
    })
    .then(response => {
      console.log(response.data);
    });
  yield put({ type: "GET_COMMENT" });
}
