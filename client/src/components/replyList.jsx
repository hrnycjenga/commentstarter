import React from "react";
import Reply from './reply.jsx';

var ReplyList = (props) => (
  <div className="reply-list">
    {props.replies.map((reply) => {
      <Reply reply={reply}/> 
    }
      )}
  </div>
);

export default ReplyList;