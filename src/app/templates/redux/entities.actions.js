import { Schema, arrayOf, normalize } from 'normalizr';
import { createAction } from 'redux-actions';

const schemes = {
	foo: new Schema('foo'),
};

export function addEntity(type, entity) {
	// TODO Kind of weird...?
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entity }, { [type]: schemes[type] }))));
}

export const setEntity = addEntity;

export function addEntities(type, entities) {
	// TODO Kind of weird...?
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entities }, { [type]: arrayOf(schemes[type]) }))));
}

// TODO
// module.exports.getEntity;

// TODO
// module.exports.getEntities;

// TODO
// module.exports.removeEntity;

// TODO
// module.exports.removeEntities;
