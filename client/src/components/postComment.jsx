import React from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

class PostComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Post A Comment...'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const text = this.state.value;
		const path = window.location.pathname;
		axios
			.post(`${path}messages`, {
				text: text
			})
			.then(
				axios.get(`${path}newmessage`).then(({ data }) => {
					this.props.addComment(data);
				})
			)
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<Form reply>
				<Form.TextArea />
				<Button content="Add Reply" labelPosition="left" icon="edit" primary />
			</Form>

			// <form onSubmit={this.handleSubmit}>
			//   <label>
			//     <textarea value={this.state.value} onChange={this.handleChange} />
			//   </label>
			//   <input type="submit" value="Submit" />
			// </form>
		);
	}
}

export default PostComment;
