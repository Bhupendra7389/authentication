import React, { Component } from "react";
import Cookies from "universal-cookie";
//import { withCookies } from "react-cookie";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    const cookies = new Cookies();
    cookies.remove("token");
  }

  handleSubmit = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(data);

    this.setState({
      email: "",
      password: ""
    });
    // await this.props.history.push("/secret");

    // event.preventDefault();
    // fetch("/api/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       const cookies = new Cookies();
    //       res.json().then(resp => {
    //         cookies.set("token", resp.token);
    //         this.props.history.push("/secret");
    //       });
    //     } else {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert("Wrong Email or Password");
    //   });
  };

  render() {
    return (
      <div className="form-group">
        <h1>Login Below!</h1>
        <form className="container sm">
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
          <button onClick={this.handleSubmit} className="btn btn-danger">
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: pushData =>
      dispatch({
        type: "LOG_IN",
        pushData
      })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
