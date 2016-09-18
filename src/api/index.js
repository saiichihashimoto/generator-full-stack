import { Base } from 'yeoman-generator';

export default class APIGenerator extends Base {
	writing() {
		if (this.options.web) {
			if (this.options.render !== 'server') {
				// We'll need to resolve the routes for the non server renders
				// The components required may require the api, so we have a stub, since we won't really need them

				this.fs.copy(this.templatePath('api/index.stub.js'), this.destinationPath('api/index.webpack.js'));
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
