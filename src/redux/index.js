import { Base } from 'yeoman-generator';

export default class ReduxGenerator extends Base {
	writing() {
		// FIXME Move more logic from other generators into here
		// Not sure how

		this.fs.copy(this.templatePath('entities/foos/schema.normalizr.js'), this.destinationPath('entities/foos/schema.normalizr.js'));
		this.fs.copy(this.templatePath('entities/reducer.js'), this.destinationPath('entities/reducer.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.js'), this.destinationPath('entities/schemas.normalizr.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.webpack.js'), this.destinationPath('entities/schemas.normalizr.webpack.js'));
		this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		this.fs.copyTpl(this.templatePath('entities/actions.js.ejs'), this.destinationPath('entities/actions.js'), Object.assign({}, this, this.options));

		if (this.options.web) {
			this.fs.copy(this.templatePath('redux/actions.webpack.js'), this.destinationPath('redux/actions.webpack.js'));
			this.fs.copy(this.templatePath('redux/createStore.webpack.js'), this.destinationPath('redux/createStore.webpack.js'));
		}

		this.npmInstall(
			[
				'lodash.mapvalues',
				'lodash.omit',
				'lodash.omitby',
				'normalizr',
				'pluralize',
				'react-redux',
				'redux',
				'redux-actions',
				'redux-thunk',
				'require-dir-all',
				'reselect',
			],
			(this.options.render === 'server') ? { save: true } : { saveDev: true }
		);

		if (this.options.api) {
			this.npmInstall(
				[
					'lodash.isarray',
				],
				(this.options.render === 'server') ? { save: true } : { saveDev: true }
			);
		}
	}
}
