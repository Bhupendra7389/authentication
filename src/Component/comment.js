import React, { Component } from "react";
import axios from "axios";
//import { connect } from "react-redux";
//import { fetchPosts } from "../actions/postActions";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { postId: this.props.postId, comments: [] };
  }

  handleComment = e => {
    this.setState({ comment: e.target.value });
  };
  handleClick = e => {
    axios
      .post("http://localhost:3004/comments", {
        postId: e.target.value,
        body: this.state.comment
      })
      .then(response => {
        console.log(response.data);
      });
    window.location.reload();
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:3004/comments?postId=" + this.props.postId)
      .then(response => {
        const comments = response.data;
        this.setState({ comments });
      });
  };
  render() {
    return (
      <div>
        <ul className="collection">
          {this.state.comments.map(comment => (
            <li
              key={comment.id}
              className="collection-item left-align red lighten-3 m-1"
            >
              <div className="p-2 border border-primary">
                <p>{comment.body}</p>
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
export default Comment;
