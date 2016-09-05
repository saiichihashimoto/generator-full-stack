const requireContext = require.context('.', false, /^\.\/.+\.actions$/);

export default Object.assign.apply(this, [{}].concat(requireContext.keys().map(requireContext)));
