import isArray from 'lodash.isarray';
import pluralize from 'pluralize';
import { arrayOf, normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import api from '../api';
import schemas from '../entities/schemas.normalizr';

const setEntity            = (type, entity) => createAction('SET_ENTITIES')(normalize(entity, schemas[type]));
const setEntities          = (type, entities) => createAction('SET_ENTITIES')(normalize(entities, arrayOf(schemas[type])));
const setPaginatedEntities = (type, entities) => createAction('SET_ENTITIES')(normalize(entities, { data: arrayOf(schemas[type]) }));

export function getEntity(type, id, params) {
	return (dispatch) => api.service('api/v1/' + type).get(id, params)
		.then((result) => dispatch(setEntity(type, result)));
}

export function getEntities(type, params) {
	return (dispatch) => api.service('api/v1/' + type).find(params)
		.then((result) => dispatch(isArray(result) ? setEntities(type, result) : setPaginatedEntities(type, result)));
}

export function createEntity(type, data, params) {
	return (dispatch) => api.service('api/v1/' + type).create(data, params)
		.then((result) => dispatch(setEntity(type, result)));
}

export function createEntities(type, data, params) {
	return (dispatch) => api.service('api/v1/' + type).create(data, params)
		.then((result) => dispatch(setEntities(type, result)));
}

export function updateEntity(type, id, data, params) {
	return (dispatch) => api.service('api/v1/' + type).update(id, data, params)
		.then((result) => dispatch(setEntity(type, result)));
}

export function updateEntities(type, data, params) {
	return (dispatch) => api.service('api/v1/' + type).update(null, data, params)
		.then((result) => dispatch(setEntities(type, result)));
}

export function patchEntity(type, id, data, params) {
	return (dispatch) => api.service('api/v1/' + type).patch(id, data, params)
		.then((result) => dispatch(setEntity(type, result)));
}

export function patchEntities(type, data, params) {
	return (dispatch) => api.service('api/v1/' + type).patch(null, data, params)
		.then((result) => dispatch(setEntities(type, result)));
}

export function deleteEntity(type, id, params) {
	return (dispatch) => api.service('api/v1/' + type).remove(id, params)
		.then((result) => dispatch(setEntity(type, result)));
}

export function deleteEntities(type, params) {
	return (dispatch) => api.service('api/v1/' + type).remove(null, params)
		.then((result) => dispatch(setEntities(type, result)));
}

Object.keys(schemas).forEach((type) => {
	const Type         = type.charAt(0).toUpperCase() + type.slice(1);
	const typeSingular = pluralize(type, 1);
	const TypeSingular = typeSingular.charAt(0).toUpperCase() + typeSingular.slice(1);

	module.exports['get' + TypeSingular] = (id, params) => getEntity(type, id, params);
	module.exports['get' + Type] = (params) => getEntities(type, params);
	module.exports['create' + TypeSingular] = (data, params) => createEntity(type, data, params);
	module.exports['create' + Type] = (data, params) => createEntities(type, data, params);
	module.exports['update' + TypeSingular] = (id, data, params) => updateEntity(type, id, data, params);
	module.exports['update' + Type] = (data, params) => updateEntities(type, data, params);
	module.exports['patch' + TypeSingular] = (id, data, params) => patchEntity(type, id, data, params);
	module.exports['patch' + Type] = (data, params) => patchEntities(type, data, params);
	module.exports['delete' + TypeSingular] = (id, params) => deleteEntity(type, id, params);
	module.exports['delete' + Type] = (params) => deleteEntities(type, params);
});
