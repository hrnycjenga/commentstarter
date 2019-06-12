import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const PostComment = ({ addComment, project }) => {
	const [ commentFormText, setCommentFormText ] = useState('');

	const handleFormChange = (e) => {
		setCommentFormText(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const body = {
			project_id: project,
			parent_id: 0,
			author_id: 1,
			created_at: new Date().toISOString(),
			comment_body: commentFormText
		};
		setCommentFormText('');
		addComment(body);
	};

	return (
		<Form reply onSubmit={handleFormSubmit}>
			<Form.TextArea value={commentFormText} onChange={handleFormChange} />
			<Button content="Add Comment" labelPosition="left" icon="chevron right" />
		</Form>
	);
};

export default PostComment;
