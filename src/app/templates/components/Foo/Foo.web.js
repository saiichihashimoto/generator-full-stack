import React, { Component } from 'react';

import styles from './Foo.styles';

export default class Foo extends Component {
	render() {
		return (
			<div className={styles.foo}>
				Hello World!
			</div>
		);
	}
}
