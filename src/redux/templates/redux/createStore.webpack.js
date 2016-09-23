import thunkMiddlware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

let createMyStore = createStore;

if (global.window && global.window.devToolsExtension) {
	createMyStore = global.window.devToolsExtension()(createMyStore);
}
createMyStore = applyMiddleware(thunkMiddlware)(createMyStore);

const requireContext = require.context('..', true, /^\.\/.+\/reducer$/);

export default function(initialState) {
	return createMyStore(
		combineReducers(requireContext.keys().reduce(
			(memo, filename) => Object.assign(memo, { [filename.match(/\.\/(.+)\/reducer/)[1]]: requireContext(filename).default }),
			{}
		)),
		initialState
	);
}
