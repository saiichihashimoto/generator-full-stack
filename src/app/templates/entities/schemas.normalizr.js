import mapValues from 'lodash.mapvalues';
import requireAll from 'require-all';

export default mapValues(
	requireAll({
		dirname:   __dirname,
		recursive: true,
		filter:    /^(schema)\.normalizr\.js$/,
		resolve:   (schema) => schema.default,
	}),
	(value) => value.schema
);
