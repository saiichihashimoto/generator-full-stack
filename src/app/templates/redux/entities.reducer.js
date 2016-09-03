import { handleActions } from 'redux-actions';

export default handleActions({
	SET_ENTITIES: {
		// TODO lodash.merge
		next: (state, action) => Object.keys(action.payload.entities).reduce(
			(state, type) => Object.assign({}, state, { [type]: Object.assign({}, state[type], action.payload.entities[type]) }),
			state
		),
	},
}, {
	foo: {},
});
