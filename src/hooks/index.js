import { BaseGenerator } from '../utils';

export default class HooksGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
		this.option('validateCommit');
	}
	writing() {
		if (this.options.codeQuality) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('codeQuality/package.json')));
		}
		if (this.options.validateCommit) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('validateCommit/package.json')));
			this.npmInstall(
				[
					'cz-conventional-changelog',
					'validate-commit-msg',
				],
				{ saveDev: true }
			);
		}
		if (this.options.codeQuality || this.options.validateCommit) {
			this.npmInstall(['ghooks'], { saveDev: true });
		}
	}
}
