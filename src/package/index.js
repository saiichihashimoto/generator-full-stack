import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	configuring() {
		this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
		// TODO babel setup
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.formatting.json')));
	}
}
