import React from 'react';
import axios from 'axios';
import CommentList from './components/CommentList.jsx';
import PostComment from './components/PostComment.jsx';
import { Header } from 'semantic-ui-react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			project: 0
		};
		this.getComments = this.getComments.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentDidMount() {
		this.getComments();
	}

	getComments() {
		let url;
		const path = window.location.pathname.replace(/\//g, '');
		if (window.location.hostname === 'localhost') {
			url = `http://3.219.86.63/${path}/messages`;
		} else {
			url = `http://localhost/${path}/messages`;
		}

		axios
			.get(url)
			.then(({ data }) => {
				this.setState({ comments: data, project: +path });
			})
			.catch((err) => console.log(err));
	}

	addComment(body) {
		let url;
		if (window.location.hostname === 'localhost') {
			url = 'http://localhost:3011/message';
		} else {
			url = 'http://3.219.86.63/message';
		}

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let newState = this.state.comments.concat(data);
				this.setState({ comments: newState });
			})
			.catch((e) => {
				alert('There was an issue with posting your comment: ', e);
			});
	}

	render() {
		return (
			<div style={{ maxWidth: '80%', margin: 'auto', display: 'inline-block', padding: '20px' }}>
				<Header as="h3" dividing>
					Comments
				</Header>

				<CommentList addComment={this.addComment} comments={this.state.comments} project={this.state.project} />

				<PostComment addComment={this.addComment} project={this.state.project} />
			</div>
		);
	}
}

export default App;
