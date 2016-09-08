import raven from 'raven';

const client = new raven.Client(process.env.SENTRY_DSN, {
	environment: process.env.NODE_ENV,
	release:     process.env.npm_package_version,
});

client.patchGlobal();

export default client;
