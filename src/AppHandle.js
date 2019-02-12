import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import withAuth from "./withAuth";
import Home from "./Home";
import Secret from "./Secret";
import Login from "./Login";

import Register from "./Register";
import AddMember from "./Component/AddMember";

import "./bootstrap.css";

class AppHandle extends Component {
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <Link to="/">Home</Link>
            <br />
            <Link to="/secret">Profile</Link>
            <br />

            <Link to="/login">Login</Link>
            <br />

            <Link to="/Register">Register</Link>
            <br />
          </nav>

          <Switch>
            <Route path="/" exact render={Home.render} />
            <Route path="/secret" component={withAuth(Secret)} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/AddMember" component={AddMember} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AppHandle;
