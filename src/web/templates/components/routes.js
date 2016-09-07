import IndexRoute from 'react-router/lib/IndexRoute';
import React from 'react';
import Route from 'react-router/lib/Route';

import App from './App/App';
import Foo from './Foo/Foo';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Foo} />
	</Route>
);
