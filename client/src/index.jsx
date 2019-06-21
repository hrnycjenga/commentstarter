import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'semantic-ui-css/semantic.min.css';

const renderComponent = () => {
	const componentIps = [ '3.219.86.63', '3.219.128.144', '3.94.138.41' ];
	const hostName = window.location.hostname;
	// If this is being served as a standalone component, render to commentRoot
	if (componentIps.includes(hostName)) {
		ReactDOM.render(<App />, document.getElementById('commentRoot'));
	} else {
		// If served on a proxy, render component to a div specifically for containing this component
		const shadowHost = document.getElementById('com');
		while (shadowHost.firstChild) {
			shadowHost.removeChild(shadowHost.firstChild);
		}
		const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
		const shadowComment = document.createElement('div');
		shadowComment.setAttribute('id', 'comment-shadow');
		shadowRoot.appendChild(shadowComment);

		ReactDOM.render(<App />, document.getElementById('comment-shadow'));
	}
};

renderComponent();
