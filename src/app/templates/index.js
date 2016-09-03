import bodyParser from 'body-parser';
import compression from 'compression';
import feathers from 'feathers';
import helmet from 'helmet';
import rest from 'feathers-rest';
import { NotFound } from 'feathers-errors';

import report from './report';

const PORT = process.env.PORT || 5100;

const rollbarErrorHandler = process.env.ROLLBAR_ACCESS_TOKEN ?
	report.errorHandler() :
	function(err, req, res, next) {
		console.error(err);
		console.error(err.stack);
		next(err);
	};

feathers()
	.use(helmet())
	.use(compression())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))

	.configure(rest())

	.all('*', (req, res, next) => next(new NotFound('Path not found', { path: req.path })))

	.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
		if (err.code >= 400 && err.code < 500) {
			return next(err);
		}
		rollbarErrorHandler(err, req, res, next);
	})

	.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
		if (res.headersSent) {
			return next(err);
		}
		res.status(err.code || 500).json(err);
	})

	.listen(PORT, () => console.log('Server is running at', 'http://localhost:' + PORT));
