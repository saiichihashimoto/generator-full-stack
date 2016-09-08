import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class ServerGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.option('renderOn', { desc: 'When document markup is rendered', type: String });
		this.option('restful', { desc: 'Include RESTful API', type: Boolean });
	}
	writing() {
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.fs.copyTpl(this.templatePath('index.js.ejs'), this.destinationPath('index.js'), Object.assign({}, this, this.options));

		if (this.options.restful) {
			this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
			this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));
		}
	}
	installing() {
		this.npmInstall(
			compact([
				'babel-cli',
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				this.options.restful && 'feathers-memory',
				this.options.restful && 'feathers-rest',
				'helmet',
				'raven',
				'require-all',
			]),
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
