import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'semantic-ui-css/semantic.min.css';
import shadowCSS from './commentStyle.style';

const renderComponent = () => {
	const componentIps = [ '3.219.86.63', '3.219.128.144', '3.94.138.41', 'localhost' ];
	const hostName = window.location.hostname;
	// If this is being served as a standalone component, render to commentRoot
	if (componentIps.includes(hostName)) {
		ReactDOM.render(<App />, document.getElementById('commentRoot'));
	} else {
		console.log('Proxy server detected, rendering to shadowDOM');
		// If served on a proxy, render component to a div specifically for containing this component
		const shadowHost = document.getElementById('com');
		while (shadowHost.firstChild) {
			shadowHost.removeChild(shadowHost.firstChild);
		}
		shadowHost.attachShadow({ mode: 'open' });

		// Get the shadow root
		const shadowRoot = document.getElementById('com').shadowRoot;
		// Create div element for react to render into
		const reactRoot = document.createElement('div');
		reactRoot.setAttribute('id', 'react-root');

		const style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(shadowCSS));

		shadowRoot.appendChild(style);

		// Append react root to shadow root
		shadowRoot.appendChild(reactRoot);

		ReactDOM.render(<App />, reactRoot);
	}
};

renderComponent();
