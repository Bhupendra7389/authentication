import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../bootstrap.css";

//import Fetch from "./Fetch";
//import { createStore } from "redux";

class AddMember extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      name: "",
      comment: "",
      age: ""
    };
    //this.handleAge = this.handleAge.bind(this);
    //this.onChange = this.onChange.bind(this);
  }

  handleClick = () => {
    var formData = {
      title: this.state.title,
      name: this.state.name,
      age: this.state.age,
      comment: this.state.comment
    };

    var request = new Request("http://localhost:3004/posts", {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    });

    var requestBody = JSON.stringify(formData);

    console.log(requestBody);

    fetch(request, { body: requestBody })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          console.log("Failure!", response.status);
        }
      })
      .then(function(json) {
        var responseBody = json;

        console.log(typeof responseBody, responseBody);
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // handleTitle = e =>
  //   this.setState({
  //     title: e.target.value
  //   });
  // handleArticle = e =>
  //   this.setState({
  //     comment: e.target.value
  //   });
  // handleName = e =>
  //   this.setState({
  //     name: e.target.value
  //   });
  // handleAge(e) {
  //   this.setState({
  //     age: e.target.value
  //   });
  // }
  // handleAge = e =>
  //   this.setState({
  //     age: e.target.value
  //   });

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg" />
          <div className="col-lg m-5 p-5">
            <div className="form-group shadow-textarea">
              <form onSubmit={this.handleClick}>
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
                  //className="form-control z-depth-1"
                  rows="3"
                  placeholder="Profession here..."
                  value={this.state.comment}
                />
                <br />

                <button className="btn btn-primary " type="Submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg" />
        </div>
      </div>
    );
  }
}

export default AddMember;
ReactDOM.render(<AddMember />, document.getElementById("root"));
