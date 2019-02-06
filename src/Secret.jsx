import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AddMember from "./Component/AddMember";
//import { instanceOf } from "prop-types";
//import { Cookies } from "react-cookie";
import cookie from "react-cookies";
import Posts from "./Fetch.js";

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      userId: cookie.load("userId"),
      message: "Loading..."
    };
  }
  handleLogout = () => {
    cookie.save("token", { path: "/" });
    cookie.remove("token", { path: "/" });
    console.log(cookie.load("token"));
  };

  componentDidMount() {
    fetch("/api/secret")
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <div>
        <br />
        <div>
          <nav className=" btn btn-dark">
            <button className="btn btn-dark" onClick={this.handleLogout}>
              Log-Out
            </button>
            <br />
          </nav>
        </div>

        {
          <div>
            ................................................................................................................................................................................................................................................................................................
          </div>
        }
        <div>
          <nav className=" btn btn-dark">
            <Link to="/Addmember">Add-Member</Link>
            <br />
          </nav>
        </div>

        <div>
          {/* <BrowserRouter> */}

          {/* </BrowserRouter> */}

          <Switch>
            <Route path="/AddMember" component={AddMember} />
          </Switch>
        </div>

        <center>
          <h3>{this.state.message}</h3>
        </center>
        <Posts />
      </div>
    );
  }
}
