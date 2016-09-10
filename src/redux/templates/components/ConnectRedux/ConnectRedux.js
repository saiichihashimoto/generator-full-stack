import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import actions from '../../redux/actions';

export default connect(
	createSelector(
		(state) => state.entities,
		(entities) => entities,
	),
	actions
);
