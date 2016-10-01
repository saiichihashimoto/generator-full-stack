import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
	}
	configuring() {
		this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
		// TODO babel setup
	}
	writing() {
		if (this.options.codeQuality) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('codeQuality/package.json')));
		}
	}
}
