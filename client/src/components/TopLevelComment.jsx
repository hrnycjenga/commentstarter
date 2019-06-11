import React from 'react';
import { Comment } from 'semantic-ui-react';
import Reply from './reply.jsx';

const TopLevelComment = ({ comment, replies }) => {
	return (
		<Comment.Group size="large">
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
					<Comment.Group size="small">
						{replies.map((reply) => {
							return <Reply key={reply.id} reply={reply} />;
						})}
					</Comment.Group>
				)}
			</Comment>
		</Comment.Group>
	);
};

export default TopLevelComment;
