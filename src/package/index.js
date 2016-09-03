import { Base } from 'yeoman-generator';

export default class PackageGenerator extends Base {
	initializing() {
		this.argument('name', { type: String, required: true });
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: this.name });
	}
}
