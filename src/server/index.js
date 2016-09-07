import { Base } from 'yeoman-generator';

export default class ServerGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.option('renderOn', { type: String, desc: 'When the documents should be rendered (build/serve/mount)' });
	}
	writing() {
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
		this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
		this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.fs.copyTpl(this.templatePath('index.js.ejs'), this.destinationPath('index.js'), Object.assign({}, this, this.options));
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
