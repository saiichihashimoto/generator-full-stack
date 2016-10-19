import { BaseGenerator } from '../base';

export default class CIGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('travis', { defaults: true, type: Boolean });
	}
	initializing() {
		if (this.options.travis) {
			this.composeWith('full-stack:travis', { options: this._passableOptions('travis') });
		}
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'cz-conventional-changelog',
				'semantic-release',
				'validate-commit-msg',
			],
			{ saveDev: true }
		);
	}
}
