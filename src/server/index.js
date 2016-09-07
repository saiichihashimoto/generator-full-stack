import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class ServerGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.option('dynamic', { type: Boolean, desc: 'If the content will be dynamically rendered' });
	}
	prompting() {
		return Promise.resolve()
			.then(() => this.prompt(compact([
				(this.options.dynamic === undefined) && {
					message: 'Will the content be dynamically rendered?',
					name:    'dynamic',
					type:    'confirm',
					default: true,
				},
			])))
			.then((answers) => {
				if (answers.dynamic !== undefined) {
					this.options.dynamic = answers.dynamic;
				}
			})
			.then(() => {
				if (this.options.dynamic) {
					this.composeWith('full-stack:web', { options: { dynamic: true } });
				}
			});
	}
	writing() {
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
		this.fs.copy(this.templatePath('Procfile.dev'), this.destinationPath('Procfile.dev'));
		this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
		this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));
		this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
	}
	installing() {
		this.npmInstall(
			[
				'babel-cli',
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				'feathers-memory',
				'feathers-rest',
				'helmet',
				'raven',
				'require-all',
			],
			{ save: true }
		);
		this.npmInstall(
			[
				'nodemon',
			],
			{ saveDev: true }
		);
	}
}
