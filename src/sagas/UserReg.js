import axios from "axios";
export default function* sendDataAsync(action) {
  console.log(action.post);
  yield axios.post("http://localhost:8080/api/register", {
    First_Name: action.post.First_Name,
    Last_Name: action.post.Last_Name,
    email: action.post.email,
    password: action.post.password
  });
}
