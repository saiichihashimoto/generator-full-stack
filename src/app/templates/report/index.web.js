import Raven from 'raven-js';

Raven
	.config(process.env.SENTRY_DSN_CLIENT, {
		environment: process.env.NODE_ENV,
		release:     process.env.npm_package_gitHead,
	})
	.install();

export default Raven;
