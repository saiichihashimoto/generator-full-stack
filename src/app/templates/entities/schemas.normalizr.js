const requireContext = require.context('.', true, /schema\.normalizr$/);

export default requireContext.keys().reduce(
	(memo, filename) => Object.assign(memo, { [filename.match(/\.\/(.*)\/schema\.normalizr/)[1]]: requireContext(filename).default }),
	{}
);
