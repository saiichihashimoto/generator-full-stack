import React, { Component } from 'react';
import property from 'lodash.property';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import actions from '../../redux/actions';
import styles from './App.styles';

export default connect(
	createStructuredSelector({
		foo: property('entities.foo'),
	}),
	actions
)(class App extends Component {
	static propTypes = {
		children: React.PropTypes.node.isRequired,
		foo:      React.PropTypes.object.isRequired,
	}
	render() {
		return (
			<div className={styles.app}>
				{this.props.children}
			</div>
		);
	}
});
