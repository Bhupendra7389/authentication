import axios from "axios";
import { put } from "redux-saga/effects";
export default function* addUserAsync(action) {
  console.log(action.userInfo);
  yield axios.post("http://localhost:8080/api/AddUser", action.userInfo);
  yield put({ type: "ADD_MEMBER" });
}
