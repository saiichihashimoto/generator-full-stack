import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import './components/global.styles';
import createStore from './redux/createStore';
import routes from './components/routes';

ReactDOM.render(
	<Provider store={createStore()}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	global.document.getElementById('mount')
);
