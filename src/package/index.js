import { Base } from 'yeoman-generator';

export default class PackageGenerator extends Base {
	prompting() {
		this.log();
		this.log('Package Details');
		this.log('---------------------------------');
		return this.prompt([
			{
				message: 'Name',
				name:    'name',
				type:    'input',
			},
			{
				message: 'Description',
				name:    'description',
				type:    'input',
			},
		]).then((answers) => this.answers = answers);
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.answers);
	}
}
