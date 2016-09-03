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
			{
				message: 'Node Version?',
				name:    'node',
				type:    'input',
				default: '6.1.0',
			},
			{
				message: 'NPM Version?',
				name:    'npm',
				type:    'input',
				default: '3.9.0',
			},
		]).then((answers) => this.answers = answers);
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.answers);
	}
}
