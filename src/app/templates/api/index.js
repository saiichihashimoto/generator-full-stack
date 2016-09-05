import feathers from 'feathers';
import rest from 'feathers-rest';

// TODO Register services manually
import fooService from '../entities/foo/service';

export default feathers()
	.configure(rest())
	.use('/foo', fooService);
