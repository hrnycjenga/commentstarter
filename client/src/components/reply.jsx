import React from "react";

var Reply = (props) => (
  <div className="comment">
    <div className="avatar">
      <img className="media-object" src={props.reply.avatar_url} alt=""/>
    </div>
    <div>reply</div>
    <div className="user-name">{props.reply.username}</div>
    <div className="timestamp">{props.reply.posted_at}</div>
    <div className="message">{props.reply.body}</div>
  </div>
);

export default Reply;
