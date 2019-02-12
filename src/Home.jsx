import React, { Component } from "react";
import Cookies from "universal-cookie";
import { withCookies } from "react-cookie";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: "Loading..."
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    cookies.remove("token");
    fetch("/api/home")
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <div>
        <h3>Home</h3>
        <center>
          <h1>{this.state.message}</h1>
        </center>
      </div>
    );
  }
}
export default withCookies(Home);
