import feathers from 'feathers/client';
import rest from 'feathers-rest/client';

export default feathers()
	.configure(rest(!process.env.NODE_ENV && 'http://localhost:5100').fetch(global.fetch));
