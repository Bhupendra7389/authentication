import React, { Component } from "react";
import "./bootstrap.css";

import Comment from "./Component/comment";
import { connect } from "react-redux";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount = () => {
    this.props.getMember();
  };
  render() {
    return (
      <div className="row">
        <div className="col-md" />
        <div className="col-md m-1">
          <div className="jumbotron-div col s12">
            <ul className="collection">
              {this.props.posts.map(post => (
                <li
                  key={post._id}
                  className="collection-item left-align red lighten-3 m-1"
                >
                  <div className="p-2 border border-primary">
                    <h5>{post.title}</h5>
                    <h5>{post.name}</h5>
                    <div>
                      <p>Profession: {post.comment}</p>
                    </div>
                    <div>
                      <p>Age: {post.age}</p>
                    </div>
                    <div className="mb-2">
                      <small>Comments -{post.author}</small>
                    </div>
                    <div>
                      <Comment postId={post._id} />
                    </div>{" "}
                  </div>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md" />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMember: () =>
      dispatch({
        type: "ADD_MEMBER"
      })
  };
};
const mapStateToProps = state => {
  return {
    posts: state.members
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
