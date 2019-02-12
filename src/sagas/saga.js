import { takeLatest, all } from "redux-saga/effects";

import sendDataAsync from "./UserReg";
import addUserAsync from "./LocalUser";
import addMemberAsync from "./GetLocalUser";
import postCommentAsync from "./PostComment";
import getCommentAsync from "./Getcomments";
import deleteCommentAsync from "./DeleteComm";
import loginAsync from "./LogInAsync";

export default function* rootSaga() {
  yield all([
    yield takeLatest("LOG_IN", loginAsync),
    yield takeLatest("ADD_USER", addUserAsync),
    yield takeLatest("ADD_MEMBER", addMemberAsync),
    yield takeLatest("COMM_DELETE", deleteCommentAsync),
    yield takeLatest("POST_COMMENT", postCommentAsync),
    yield takeLatest("SEND_DATA", sendDataAsync),
    yield takeLatest("GET_COMMENT", getCommentAsync)
  ]);
}
