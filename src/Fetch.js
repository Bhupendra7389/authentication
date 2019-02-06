import React, { Component } from "react";
import "./bootstrap.css";
import axios from "axios";
import Comment from "./Component/comment";
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
      //comment: ""
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:3004/posts").then(response => {
      const posts = response.data;
      this.setState({ posts });
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-md" />
        <div className="col-md m-1">
          <div className="jumbotron-div col s12">
            <ul className="collection">
              {this.state.posts.map(post => (
                <li
                  key={post.id}
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
                      <Comment postId={post.id} />
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

export default Posts;
