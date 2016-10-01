import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
		this.option('name');
		this.option('githubOrg');
		this.option('release');
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
	}
	writing() {
		if (this.options.codeQuality) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('codeQuality/package.json')));
		}
		if (this.options.release) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('release/package.json')));
		}
	}
}
