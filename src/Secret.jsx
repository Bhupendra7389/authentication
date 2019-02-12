import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AddMember from "./Component/AddMember";
import { withCookies } from "react-cookie";
import Posts from "./Fetch.js";
import Cookies from "universal-cookie";

class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: "Loading..."
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    this.props.history.push("/login");
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

export default withCookies(Secret);
