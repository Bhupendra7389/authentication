import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      First_Name: "",
      Last_Name: "",
      email: "",
      password: ""
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // const { value, name } = e.target;
    // this.setState({
    //   [name]: value
    // });
  };
  onSubmit = () => {
    axios.post("/api/register", {
      First_Name: this.state.First_Name,
      Last_Name: this.state.Last_Name,
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <div>
        <h1>register</h1>
        <form onSubmit={this.onSubmit} className="container">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="First_Name"
              placeholder="Enter Name"
              value={this.state.First_Name}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <input
              className="form-control"
              type="text"
              name="Last_Name"
              placeholder="Enter Your Last Name"
              value={this.state.Last_Name}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <input className="form-control" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
