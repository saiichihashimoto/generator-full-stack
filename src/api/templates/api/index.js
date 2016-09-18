import feathers from 'feathers';
import mapValues from 'lodash.mapvalues';
import path from 'path';
import requireDirAll from 'require-dir-all';
import rest from 'feathers-rest';

const api = feathers()
	.configure(rest());

const services = mapValues(
	requireDirAll(path.resolve(__dirname, '../entities'), {
		recursive:    true,
		includeFiles: /service.js$/,
	}),
	(service) => service.service.default
);

Object.keys(services).forEach((name) => {
	api.use('/' + name, services[name]);
});

export default api;
