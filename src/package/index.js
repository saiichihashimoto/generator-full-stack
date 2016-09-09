import { Base } from 'yeoman-generator';

export default class PackageGenerator extends Base {
	initializing() {
		this.log('package:initializing get git information'); // TODO
	}
	prompting() {
		return this._prompt([
			{
				message:  'Package name',
				name:     'name',
				type:     'input',
				validate: (name) => {
					if (name.length) {
						return true;
					}
					return 'A package name is required.';
				},
			},
			{
				message: 'Package user (or organization)',
				name:    'org',
				type:    'input',
			},
			{
				message: 'Package description',
				name:    'description',
				type:    'input',
			},
			{
				message: 'Package homepage',
				name:    'homepage',
				type:    'input',
			},
			{
				message: 'Package license',
				name:    'license',
				type:    'list',
				default: 'MIT',
				choices: [
					{ name: 'MIT', value: 'MIT' },
					{ name: 'None', value: null },
				],
			},
		]);
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json.ejs'), this.destinationPath('package.json'), Object.assign({}, this, this.options));
		this.npmInstall(
			[
				'npm-run-all',
				'sort-package-json',
			],
			{ saveDev: true }
		);
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
