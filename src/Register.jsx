import React, { Component } from "react";
import Cookies from "universal-cookie";

import { connect } from "react-redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      First_Name: "",
      Last_Name: "",
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    cookies.remove("token");
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    const post = {
      First_Name: this.state.First_Name,
      Last_Name: this.state.Last_Name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.sendData(post);
    this.setState({
      First_Name: "",
      Last_Name: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div className="container">
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
            <button className=" btn btn-danger " onClick={this.handleSubmit}>
              ADD-MEMBER
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sendData: post => dispatch({ type: "SEND_DATA", post })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Home);
