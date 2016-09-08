import './report';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

import './components/global.styles';
import createStore from './redux/createStore';
import routes from './components/routes';

const stateElement = document.getElementById('state');
let state;
if (stateElement) {
	try {
		state = JSON.parse(stateElement.innerHTML);
	} catch (err) {
		switch (err.name) {
			case 'SyntaxError':
				global.location.reload(true);
				break;
			default:
				throw err;
		}
	}
}
render(
	<Provider store={createStore(state)}>
		<Router history={browserHistory} routes={routes} onUpdate={global.ga && function() {
			global.ga('set', 'page', global.location.pathname + global.location.search + global.location.hash);
			global.ga('send', 'pageview');
		}} />
	</Provider>,
	global.document.getElementById('mount')
);
