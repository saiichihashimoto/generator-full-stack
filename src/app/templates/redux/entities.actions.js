import { arrayOf, normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import schemas from '../entities/schemas.normalizr';

export function addEntity(type, entity) {
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entity }, { [type]: schemas[type] }))));
}

export const setEntity = addEntity;

export function addEntities(type, entities) {
	return (dispatch) => Promise.resolve(dispatch(createAction('SET_ENTITIES')(normalize({ [type]: entities }, { [type]: arrayOf(schemas[type]) }))));
}
