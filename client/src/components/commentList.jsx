import React from 'react';
import TopLevelComment from './TopLevelComment.jsx';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

var CommentList = (props) => {
	const topLevelComments = props.comments.filter((comment) => comment.parent_id === 0);

	return (
		<Segment>
			{props.comments === 0 ? (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			) : (
				topLevelComments.map((comment) => {
					const replies = props.comments.filter((comment) => comment.parent_id === comment.id);

					return <TopLevelComment key={comment.id} comment={comment} replies={replies} />;
				})
			)}
		</Segment>
	);
};
export default CommentList;
