const requireContext = require.context('..', true, /^\.\/.+\/actions$/);

export default requireContext.keys().reduce((memo, filename) => Object.assign(memo, requireContext(filename)), {});
