const requireContext = require.context('.', false, /^\.\/.+\.actions$/);

export default requireContext.keys().reduce((memo, filename) => Object.assign(memo, requireContext(filename)), {});
