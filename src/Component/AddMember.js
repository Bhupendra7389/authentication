import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../bootstrap.css";

import { connect } from "react-redux";

class AddMember extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      name: "",
      comment: "",
      age: ""
    };
  }

  handleClick = () => {
    var formData = {
      title: this.state.title,
      name: this.state.name,
      age: this.state.age,
      comment: this.state.comment
    };
    this.props.AddMember(formData);
    this.setState({
      title: "",
      name: "",
      comment: "",
      age: ""
    });
    this.props.history.push("/secret");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg" />
          <div className="col-lg m-5 p-5">
            <div className="form-group shadow-textarea">
              <input
                type="text"
                name="name"
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter Name"
                value={this.state.name}
              />
              <br />
              <input
                type="text"
                name="title"
                onChange={this.onChange}
                className="form-control"
                placeholder="Title..."
                value={this.state.title}
              />
              <br />
              <input
                type="number"
                min="1"
                max="100"
                name="age"
                onChange={this.onChange}
                className="form-control"
                placeholder="Age..."
                value={this.state.age}
              />
              <br />
              <textarea
                className="form-control"
                name="comment"
                onChange={this.onChange}
                rows="3"
                placeholder="Profession here..."
                value={this.state.comment}
              />
              <br />

              <button className="btn btn-primary " onClick={this.handleClick}>
                Submit
              </button>
            </div>
          </div>
          <div className="col-lg" />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    AddMember: userInfo =>
      dispatch({
        type: "ADD_USER",
        userInfo
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddMember);
ReactDOM.render(<AddMember />, document.getElementById("root"));
