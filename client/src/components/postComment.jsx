import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const PostComment = () => {
	const [ commentFormText, setCommentFormText ] = useState('');

	const handleFormChange = (e) => {
		setCommentFormText(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		console.log(`Submitted message ${commentFormText}!`);
	};

	return (
		<Form reply onSubmit={handleFormSubmit}>
			<Form.TextArea value={commentFormText} onChange={handleFormChange} />
			<Button content="Add Comment" labelPosition="left" icon="chevron right" />
		</Form>
	);
};

export default PostComment;
