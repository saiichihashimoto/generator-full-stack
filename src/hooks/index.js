import { BaseGenerator } from '../utils';

export default class HooksGenerator extends BaseGenerator {
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
	}
}
