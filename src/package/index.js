import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	configuring() {
		this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
		// TODO babel setup
	}
}
