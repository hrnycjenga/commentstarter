import React from "react";
import Comment from "./comment.jsx";

var CommentList = props => {
  return (
    <div className="comment-list">
      {props.comments.map(comment => {
        return (
          <div>
            <Comment comment={comment} id={comment.id} />
          </div>
        );
      })}
    </div>
  );
};
export default CommentList;
