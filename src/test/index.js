import { BaseGenerator } from '../base';

export default class TestGenerator extends BaseGenerator {
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'istanbul',
				'mocha',
				'npm-run-all',
			],
			{ saveDev: true }
		);
	}
}
