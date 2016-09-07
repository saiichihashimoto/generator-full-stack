import Helmet from 'react-helmet';
import React from 'react';
import { GeneralError } from 'feathers-errors';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';

import createStore from '../redux/createStore';
import routes from '../components/routes';

export default function(req, res, next) {
	match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			next(new GeneralError(error.message));
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			try {
				const store = createStore();
				const html  = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
				const head  = Helmet.rewind();

				res.render('index', {
					html:           html,
					state:          JSON.stringify(store.getState()),
					htmlAttributes: head.htmlAttributes.toString(),
					title:          head.title.toString(),
					meta:           head.meta.toString(),
					link:           head.link.toString(),
					style:          head.style.toString(),
					script:         head.script.toString(),
				});
			} catch (err) {
				next(err);
			}
		} else {
			next();
		}
	});
}
