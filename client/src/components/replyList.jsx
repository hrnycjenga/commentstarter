import React from "react";
import Reply from './reply.jsx';

var replyList = (props) => (
  <div className="reply-list">
    {this.props.replies.map((reply) => {
      <Reply reply={reply}/> 
    }
      )}
  </div>
);