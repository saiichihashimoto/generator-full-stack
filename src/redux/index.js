import { Base } from 'yeoman-generator';

export default class ReduxGenerator extends Base {
	writing() {
		this.fs.copy(this.templatePath('entities/foos/schema.normalizr.js'), this.destinationPath('entities/foos/schema.normalizr.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.js'), this.destinationPath('entities/schemas.normalizr.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.web.js'), this.destinationPath('entities/schemas.normalizr.web.js'));
		this.fs.copy(this.templatePath('redux/actions.js'), this.destinationPath('redux/actions.js'));
		this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		this.fs.copy(this.templatePath('redux/entities.reducer.js'), this.destinationPath('redux/entities.reducer.js'));
		this.fs.copyTpl(this.templatePath('redux/entities.actions.js.ejs'), this.destinationPath('redux/entities.actions.js'), Object.assign({}, this, this.options));

		if (this.options.web) {
			this.fs.copy(this.templatePath('redux/actions.web.js'), this.destinationPath('redux/actions.web.js'));
			this.fs.copy(this.templatePath('redux/createStore.web.js'), this.destinationPath('redux/createStore.web.js'));
		}

		this.npmInstall(
			[
				'lodash.mapvalues',
				'lodash.omit',
				'normalizr',
				'pluralize',
				'react-redux',
				'redux',
				'redux-actions',
				'redux-thunk',
				'require-all',
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
