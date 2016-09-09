import feathers from 'feathers';
import rest from 'feathers-rest';

// TODO replace with require-all
import foosService from '../entities/foos/service';

export default feathers()
	.configure(rest())
	.use('/foos', foosService);
