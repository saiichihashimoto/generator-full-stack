import thunkMiddlware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

let createMyStore = createStore;

if (global.window && global.window.devToolsExtension) {
	createMyStore = global.window.devToolsExtension()(createMyStore);
}
createMyStore = applyMiddleware(thunkMiddlware)(createMyStore);

const reducers = {
	entities: require('./entities.reducer').default,
};

export default function(initialState) {
	return createMyStore(
		combineReducers(reducers),
		initialState
	);
}