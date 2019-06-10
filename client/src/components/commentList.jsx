import React from 'react';
import TopLevelComment from './TopLevelComment.jsx';

var CommentList = (props) => {
	const topLevelComments = props.comments.filter((comment) => comment.parent_id === 0);

	return (
		<div className="comment-list">
			{topLevelComments.map((comment) => {
				const replies = props.comments.filter((comment) => comment.parent_id === comment.id);

				return <TopLevelComment key={comment.id} comment={comment} replies={replies} />;
			})}
		</div>
	);
};
export default CommentList;
