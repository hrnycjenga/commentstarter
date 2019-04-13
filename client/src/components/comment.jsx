import React from "react";
import axios from "axios";
import ReplyList from "./replyList.jsx";

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
      .get(`${path}${this.props.id}/replies`)
      .then(({ data }) => {
        console.log('reply data: ', data)
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
        <div className="reply"><ReplyList replies={this.state.replies}/></div>
      </div>
    );
  }
}

export default Comment;
