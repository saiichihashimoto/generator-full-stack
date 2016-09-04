import mapValues from 'lodash.mapvalues';
import { handleActions } from 'redux-actions';

import schemas from '../entities/schemas.normalizr';

export default handleActions(
	{
		SET_ENTITIES: {
			next: (state, action) => Object.keys(action.payload.entities).reduce(
				(state, type) => Object.assign({}, state, { [type]: Object.assign({}, state[type], action.payload.entities[type]) }),
				state
			),
		},
	},
	mapValues(schemas, () => new Object()) // eslint-disable-line no-new-object
);
