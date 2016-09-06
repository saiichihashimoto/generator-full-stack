import React, { Component } from 'react';
import property from 'lodash.property';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import actions from '../../redux/actions';
import styles from './App.styles';

export default connect(
	createStructuredSelector({
		foos: property('entities.foos'),
	}),
	actions
)(class App extends Component {
	static propTypes = {
		children: React.PropTypes.node.isRequired,
		foos:     React.PropTypes.object.isRequired,
	}
	render() {
		return (
			<div className={styles.app}>
				{this.props.children}
			</div>
		);
	}
});
