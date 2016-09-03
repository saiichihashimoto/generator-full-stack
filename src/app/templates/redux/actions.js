const requireContext = require.context('.', false, /^\.\/.+\.actions$/);
const allActions     = requireContext.keys().map(requireContext);
allActions.unshift({});

export default Object.assign.apply(this, allActions);
