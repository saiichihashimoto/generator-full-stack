import feathers from 'feathers';
import path from 'path';
import requireAll from 'require-all';
import rest from 'feathers-rest';

const api = feathers()
	.configure(rest());

const services = requireAll({
	dirname: path.join(__dirname, '../entities'),
	filter:  /^(service)\.js$/,
	resolve: (service) => service.default,
});

Object.keys(services).forEach((name) => {
	api.use('/' + name, services[name].service);
});

export default api;
