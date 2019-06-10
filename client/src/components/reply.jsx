import React from 'react';

var Reply = ({ reply }) => (
	<Comment>
		<Comment.Avatar src={reply.avatar_url} />
		<Comment.Content>
			<Comment.Author as="a">
				{reply.first_name} {reply.last_name}
			</Comment.Author>
			<Comment.Metadata>
				<div>{reply.created_at}</div>
			</Comment.Metadata>
			<Comment.Text>{reply.comment_body}</Comment.Text>
			<Comment.Actions>
				<Comment.Action>Reply</Comment.Action>
			</Comment.Actions>
		</Comment.Content>
	</Comment>
);

export default Reply;
