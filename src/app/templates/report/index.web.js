import rollbar from 'rollbar-browser';
import wrap from 'underscore';

module.exports = rollbar.init({
	payload: {
		client: {
			javascript: {
				/* eslint-disable camelcase */
				code_version:          process.env.npm_package_gitHead,
				source_map_enabled:    true,
				guess_uncaught_frames: true,
				/* eslint-enable camelcase */
			},
		},
		environment: process.env.NODE_ENV,
	},
	accessToken:                process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
	enabled:                    Boolean(process.env.ROLLBAR_CLIENT_ACCESS_TOKEN),
	verbose:                    !process.env.NODE_ENV,
	captureUncaught:            true,
	captureUnhandledRejections: true,
});

['critical', 'error', 'warning', 'info', 'debug', 'log'].forEach((method) => {
	module.exports[method] = wrap(module.exports[method], (func, err) => func.bind(module.exports)(err));
});
