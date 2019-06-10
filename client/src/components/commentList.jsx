import React from 'react';
import Comment from './comment.jsx';

var CommentList = (props) => {
	const topLevelComments = props.comments.filter((comment) => comment.parent_id === 0);

	return (
		<div className="comment-list">
			{topLevelComments.map((comment) => {
				const replies = props.comments.filter((comment) => comment.parent_id === comment.id);

				return (
					<div>
						<Comment key={comment.id} comment={comment} replies={replies} />
					</div>
				);
			})}
		</div>
	);
};
export default CommentList;
