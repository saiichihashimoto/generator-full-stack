import mapValues from 'lodash.mapvalues';
import omitBy from 'lodash.omitby';
import requireDirAll from 'require-dir-all';
import thunkMiddlware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

let createMyStore = createStore;

createMyStore = applyMiddleware(thunkMiddlware)(createMyStore);

const reducers = mapValues(
	omitBy(
		requireDirAll('..', {
			recursive:    true,
			includeFiles: /reducer(\.[^.]+)*\.js$/,
		}),
		(directory) => !directory.reducer
	),
	(directory) => directory.reducer.default
);

export default function(initialState) {
	return createMyStore(
		combineReducers(reducers),
		initialState
	);
}
