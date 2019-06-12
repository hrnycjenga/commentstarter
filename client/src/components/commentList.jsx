import React from 'react';
import TopLevelComment from './TopLevelComment.jsx';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

var CommentList = ({ comments, project, addComment }) => {
	const topLevelComments = comments.filter((comment) => comment.parent_id === 0).sort((a, b) => {
		return new Date(a.created_at) - new Date(b.created_at);
	});

	return (
		<Segment>
			{comments === 0 ? (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			) : (
				topLevelComments.map((comment) => {
					const replies = comments.filter((row) => row.parent_id === comment.id).sort((a, b) => {
						return new Date(a.created_at) - new Date(b.created_at);
					});
					return (
						<TopLevelComment
							key={comment.id}
							comment={comment}
							replies={replies}
							project={project}
							addComment={addComment}
						/>
					);
				})
			)}
		</Segment>
	);
};
export default CommentList;
