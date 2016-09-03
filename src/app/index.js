import { Base } from 'yeoman-generator';

export default class KoggGenerator extends Base {
	prompting() {
		this.log();
		this.log('Project Details');
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
	writing() {
		// QUESTION Does this go here or in configuring?
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.answers);
	}
}
