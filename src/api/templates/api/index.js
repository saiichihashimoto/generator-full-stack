import feathers from 'feathers';
import rest from 'feathers-rest';

import foosService from '../entities/foos/service';

export default feathers()
	.configure(rest())
	.use('/foos', foosService);
