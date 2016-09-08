import feathers from 'feathers/client';
import rest from 'feathers-rest/client';

export default feathers()
	.configure(rest().fetch(global.fetch));
