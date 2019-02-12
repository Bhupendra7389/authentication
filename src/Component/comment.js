import React, { Component } from "react";

import { connect } from "react-redux";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { postId: this.props.postId, comments: "" };
  }

  handleComment = e => {
    e.preventDefault();
    this.setState({ comment: e.target.value });
  };
  handleClick = e => {
    e.preventDefault();
    const commentData = { postId: e.target.value, body: this.state.comment };
    this.setState({ comments: "" });
    this.props.postComment(commentData);
    this.setState({ comment: "" });
  };
  deleteComment = e => {
    const value = { postId: e.target.value };

    this.props.deleteComment(value);
  };
  componentDidMount = () => {
    this.props.getComment();
    this.setState({
      comments: this.props.comment
    });
  };

  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.CommentData.map(post => (
            <li
              key={post._id}
              className="collection-item left-align red lighten-3 m-1"
            >
              <div className="p-2 border border-primary">
                {post.comments.map(post => (
                  <div className="p-2 border border-primary" key={post}>
                    {post}
                  </div>
                ))}
                <br />
                <button
                  className="badge badge-danger badge-sm"
                  onClick={this.deleteComment}
                  value={post._id}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <textarea
            onChange={this.handleComment}
            rows="1"
            placeholder="Comment..."
            value={this.state.comment}
          />
          <button
            value={this.state.postId}
            className="badge badge-primary badge-sm"
            onClick={this.handleClick}
          >
            Comment
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    CommentData: state.data
  };
};
const mapDisPatchToProps = dispatch => {
  return {
    postComment: commentData => dispatch({ type: "POST_COMMENT", commentData }),

    getComment: () =>
      dispatch({
        type: "GET_COMMENT"
      }),

    deleteComment: req => dispatch({ type: "COMM_DELETE", req })
  };
};
export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(Comment);
