import React, { useState } from 'react';
import { Comment } from 'semantic-ui-react';
import Reply from './Reply.jsx';
import ReplyForm from './ReplyForm.jsx';
import { format } from 'timeago.js';

const TopLevelComment = ({ comment, replies, project, addComment }) => {
	const [ showReplyForm, setShowReplyForm ] = useState(false);
	const [ replyFormText, setReplyFormText ] = useState('');

	const handleFormChange = (e) => {
		setReplyFormText(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const body = {
			project_id: project,
			parent_id: comment.id,
			author_id: 1,
			created_at: new Date().toISOString(),
			comment_body: replyFormText
		};
		setReplyFormText('');
		setShowReplyForm(false);
		addComment(body);
	};

	return (
		<Comment.Group size="large">
			<Comment>
				<Comment.Avatar src={comment.avatar_url} />
				<Comment.Content>
					<Comment.Author as="a">
						{comment.first_name} {comment.last_name}
					</Comment.Author>
					<Comment.Metadata>
						<div>{format(new Date(comment.created_at))}</div>
					</Comment.Metadata>
					<Comment.Text>{comment.comment_body}</Comment.Text>
					<Comment.Actions>
						<Comment.Action
							onClick={() => {
								setShowReplyForm(!showReplyForm);
							}}
						>
							Reply
						</Comment.Action>
					</Comment.Actions>
					{showReplyForm ? (
						<ReplyForm
							replyFormText={replyFormText}
							handleFormChange={handleFormChange}
							handleFormSubmit={handleFormSubmit}
						/>
					) : (
						''
					)}
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
