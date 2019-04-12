import React from "react";
import Comment from './comment.jsx';

class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(<div className="comment-list">
    {this.props.comments.map((comment) => {
     return <div><Comment comment={comment}/></div>
    }
      )}
  </div>)
  }
}

export default CommentList;