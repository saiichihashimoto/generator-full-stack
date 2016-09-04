import { Schema, arrayOf, normalize } from 'normalizr';
import { createAction } from 'redux-actions';

const schemes = {
	foo: new Schema('foo'),
};

export function addEntity(type, entity) {
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entity }, { [type]: schemes[type] }))));
}

export const setEntity = addEntity;

export function addEntities(type, entities) {
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entities }, { [type]: arrayOf(schemes[type]) }))));
}
