import React from "react";
import axios from "axios";
import Reply from "./reply.jsx";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: []
    };
  }

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    const path = window.location.pathname;
    axios
      .get(`messages${path}`)
      .then(({ data }) => {
        this.setState({ replies: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="comment">
        <div className="avatar">
          <img
            className="media-object"
            src={this.props.comment.avatar_url}
            alt=""
          />
        </div>
        <div className="user-name">{this.props.comment.username}</div>
        <div className="timestamp">{this.props.comment.posted_at}</div>
        <div className="message">{this.props.comment.body}</div>
        {/* <div className="reply"><Reply replies={this.state.replies}/></div> */}
      </div>
    );
  }
}

export default Comment;
