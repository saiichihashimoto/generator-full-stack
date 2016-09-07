import raven from 'raven';

export default new raven.Client(process.env.SENTRY_DSN, {
	environment: process.env.NODE_ENV,
	release:     process.env.npm_package_version,
});
