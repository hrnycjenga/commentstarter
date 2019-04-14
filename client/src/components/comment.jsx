import React from "react";
import axios from "axios";
import ReplyList from "./replyList.jsx";
import PostReply from "./postReply.jsx";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: []
    };
    this.addReply = this.addReply.bind(this);
  }

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    const path = window.location.pathname;
    axios
      .get(`${path}${this.props.id}/replies`)
      .then(({ data }) => {
        this.setState({ replies: data });
      })
      .catch(err => console.log(err));
  }
  
  addReply(reply) {
    let newState = this.state.replies.concat(reply)
    this.setState({replies: newState})
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
        <div className="leaveReply" > <PostReply messageId={this.props.comment.id} addReply={this.addReply}/> </div>
        <div className="reply"><ReplyList replies={this.state.replies}/></div>
      </div>
    );
  }
}

export default Comment;
