import React from 'react';
import { Comment } from 'semantic-ui-react';
import ReplyList from './replyList.jsx';
// import PostReply from './postReply.jsx';

const TopLevelComment = ({ comment, replies }) => {
	return (
		<Comment>
			<Comment.Avatar src={comment.avatar_url} />
			<Comment.Content>
				<Comment.Author as="a">
					{comment.first_name} {comment.last_name}
				</Comment.Author>
				<Comment.Metadata>
					<div>{comment.created_at}</div>
				</Comment.Metadata>
				<Comment.Text>{comment.comment_body}</Comment.Text>
				<Comment.Actions>
					<Comment.Action>Reply</Comment.Action>
				</Comment.Actions>
			</Comment.Content>
			{replies.length > 0 && (
				<Comment.Group>
					<ReplyList replies={replies} />
				</Comment.Group>
			)}
			{/* 
			<div className="comment">
				<div className="avatar">
					<img className="media-object" src={comment.avatar_url} alt="" />
				</div>
				<div className="user-name">
					{comment.first_name} {comment.last_name}
				</div>
				<div className="timestamp">{comment.created_at}</div>
				<div className="message">{comment.comment_body}</div>
				<div className="leaveReply">
					<PostReply />
				</div>
				<div className="reply">
					<ReplyList replies={replies} />
				</div>
			</div> */}
		</Comment>
	);
};

export default TopLevelComment;

// class Comment extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       replies: []
//     };
//     this.addReply = this.addReply.bind(this);
//   }

//   componentDidMount() {
//     this.getReplies();
//   }

//   getReplies() {
//     const path = window.location.pathname;
//     axios
//       .get(`${path}${this.props.id}/replies`)
//       .then(({ data }) => {
//         this.setState({ replies: data });
//       })
//       .catch(err => console.log(err));
//   }

//   addReply(reply) {
//     let newState = this.state.replies.concat(reply)
//     this.setState({replies: newState})
//   }

//   render() {
//     return (
//       <div className="comment">
//         <div className="avatar">
//           <img
//             className="media-object"
//             src={this.props.comment.avatar_url}
//             alt=""
//           />
//         </div>
//         <div className="user-name">{this.props.comment.username}</div>
//         <div className="timestamp">{this.props.comment.posted_at}</div>
//         <div className="message">{this.props.comment.body}</div>
//         <div className="leaveReply" > <PostReply messageId={this.props.comment.id} addReply={this.addReply}/> </div>
//         <div className="reply"><ReplyList replies={this.state.replies}/></div>
//       </div>
//     );
//   }
// }

// export default Comment;
