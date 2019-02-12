import Cookies from "universal-cookie";

export default function* loginAsync(action) {
  fetch("http://localhost:8080/api/authenticate", {
    method: "POST",
    body: JSON.stringify(action.pushData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        const cookies = new Cookies();
        res.json().then(resp => {
          cookies.set("token", resp.token);
          //Window.history.push("/secret");
          alert("You are Successfully Logged-In");
        });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert("Wrong Email or Password");
    });
}
