import React from "react";

var Reply = (props) => (
  <div className="comment">
    <div className="avatar">
      <img className="media-object" src={props.comment.avatar_url} alt=""/>
    </div>
    <div>reply</div>
    <div className="user-name">{props.comment.username}</div>
    <div className="timestamp">{props.comment.posted_at}</div>
    <div className="message">{props.comment.body}</div>
  </div>
);

export default Reply;
