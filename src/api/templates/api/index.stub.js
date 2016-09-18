import feathers from 'feathers';
import rest from 'feathers-rest';

export default feathers()
	.configure(rest());
