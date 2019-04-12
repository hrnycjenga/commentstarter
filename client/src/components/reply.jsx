import React from "react";

var Reply = (props) => (
  <div className="comment">
    <div className="avatar">
      <img className="media-object" src={this.props.comment.avatar_url} alt=""/>
    </div>
    <div className="user-name">{this.props.comment.username}</div>
    <div className="timestamp">{this.props.comment.posted_at}</div>
    <div className="message">{this.props.comment.body}</div>
  </div>
);

export default Reply;
