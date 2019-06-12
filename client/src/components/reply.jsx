import React from 'react';
import { Comment } from 'semantic-ui-react';
import { format } from 'timeago.js';

var Reply = ({ reply }) => (
	<Comment>
		<Comment.Avatar src={reply.avatar_url} />
		<Comment.Content>
			<Comment.Author as="a">
				{reply.first_name} {reply.last_name}
			</Comment.Author>
			<Comment.Metadata>
				<div>{format(reply.created_at)}</div>
			</Comment.Metadata>
			<Comment.Text>{reply.comment_body}</Comment.Text>
		</Comment.Content>
	</Comment>
);

export default Reply;
