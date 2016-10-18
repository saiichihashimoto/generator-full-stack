import { BaseGenerator } from '../base';

export default class TestGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('coverage', { defaults: true, type: Boolean });
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'mocha',
				'npm-run-all',
			],
			{ saveDev: true }
		);
		if (this.options.coverage) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('coverage/package.json')));
			this.npmInstall(
				[
					'istanbul',
				],
				{ saveDev: true }
			);
		}
	}
}
