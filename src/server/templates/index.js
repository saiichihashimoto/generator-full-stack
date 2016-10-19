import bodyParser from 'body-parser';
import compression from 'compression';
import feathers from 'feathers';
import helmet from 'helmet';
import raven from 'raven';
import { NotFound } from 'feathers-errors';

import report from './report';

const PORT = process.env.PORT || 5100;

feathers()
	.use(helmet())
	.use(compression())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(raven.middleware.express.requestHandler(report))

	.all('*', (req, res, next) => next(new NotFound('Path not found', { path: req.path })))

	.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
		if (!err.code || err.code < 400 || err.code >= 500) {
			return next(err);
		}
		err.message = err.message || 'Do not recognize url ' + req.path;
		res.status(err.code || 500).json(err);
	})
	.use(raven.middleware.express.errorHandler(report))
	.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
		if (!process.env.NODE_ENV) {
			console.log(err);
		}
		err.message = err.message || 'Do not recognize url ' + req.path;
		res.status(err.code || 500).json(err);
	})

	.listen(PORT, () => console.log('Server is running at', 'http://localhost:' + PORT));
