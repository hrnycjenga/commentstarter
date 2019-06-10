import React from 'react';
import Reply from './reply.jsx';

var ReplyList = ({ replies }) => (
	<Comment.Content>
		{replies.map((reply) => {
			return <Reply reply={reply} />;
		})}
	</Comment.Content>
	// <div
	// 	className="reply-list"
	// 	style={{ paddingLeft: '1.8rem', paddingRight: '1.8rem', border: '0.1rem solid #DCDEDD' }}
	// >
	// 	{replies.map((reply) => {
	// 		return <Reply reply={reply} />;
	// 	})}
	// </div>
);

export default ReplyList;
