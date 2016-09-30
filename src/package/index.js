import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('format');
		this.option('lint');
	}
	configuring() {
		this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
		// TODO babel setup
	}
	writing() {
		if (this.options.format) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('format/package.json')));
		}
		if (this.options.lint) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('lint/package.json')));
		}
	}
}
