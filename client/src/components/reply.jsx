import React from 'react';

var Reply = ({ reply }) => (
	<div className="comment">
		<div className="avatar">
			<img className="media-object" src={reply.avatar_url} alt="" />
		</div>
		<div>reply</div>
		<div className="user-name">
			{reply.first_name} {reply.last_name}
		</div>
		<div className="timestamp">{reply.created_at}</div>
		<div className="message">{reply.comment_body}</div>
	</div>
);

export default Reply;
