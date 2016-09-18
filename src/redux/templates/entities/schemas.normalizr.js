import mapValues from 'lodash.mapvalues';
import requireDirAll from 'require-dir-all';

export default mapValues(
	requireDirAll(__dirname, {
		recursive:    true,
		includeFiles: /schema.normalizr.js$/,
	}),
	(schema) => schema['schema.normalizr'].default
);
