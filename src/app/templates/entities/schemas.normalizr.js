const requireContext = require.context('.', true, /schema\.normalizr$/);

const schemas = requireContext.keys().reduce(
	(memo, filename) => Object.assign(memo, { [filename.match(/\.\/(.*)\/.*/)[1]]: requireContext(filename).default }),
	{}
);

export default schemas;
