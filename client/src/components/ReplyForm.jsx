import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const ReplyForm = ({ replyFormText, handleFormChange, handleFormSubmit }) => {
	return (
		<Form reply onSubmit={handleFormSubmit}>
			<Form.TextArea
				placeholder="Reply to the above message..."
				value={replyFormText}
				onChange={handleFormChange}
			/>
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default ReplyForm;
