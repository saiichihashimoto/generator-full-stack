import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

import './components/global.styles';
import createStore from './redux/createStore';
import routes from './components/routes';

render(
	<Provider store={createStore()}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	global.document.getElementById('mount')
);
