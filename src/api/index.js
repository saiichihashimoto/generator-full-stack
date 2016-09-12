import { Base } from 'yeoman-generator';

export default class APIGenerator extends Base {
	writing() {
		if (this.options.web) {
			if (!this.options.server && this.options.render !== 'server') {
				this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.stub.js'));
			}

			this.fs.copy(this.templatePath('api/index.web.js'), this.destinationPath('api/index.web.js'));
			this.npmInstall(
				[
					'feathers',
					'feathers-rest',
				],
				{ saveDev: true }
			);
		}

		if (this.options.server) {
			this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
			this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));

			this.npmInstall(
				[
					'feathers',
					'feathers-memory',
					'feathers-rest',
					'require-all',
				],
				{ save: true }
			);
		}
	}
}
