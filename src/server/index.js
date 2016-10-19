import { BaseGenerator } from '../base';

export default class ServerGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('heroku', { defaults: true, type: Boolean });
	}
	initializing() {
		if (this.options.heroku) {
			this.composeWith('full-stack:heroku', { options: this._passableOptions('heroku') });
		}
	}
	configuring() {
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
		this.fs.copy(this.templatePath('Procfile.dev'), this.destinationPath('Procfile.dev'));
		this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.npmInstall(
			[
				'babel-cli',
				'babel-plugin-transform-class-properties',
				'babel-preset-es2015',
				'babel-preset-react',
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				'helmet',
				'raven',
			],
			{ save: true }
		);
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'nodemon',
			],
			{ saveDev: true }
		);
	}
}
