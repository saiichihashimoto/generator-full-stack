import { compact } from 'lodash';
import { Base } from 'yeoman-generator';
import { isNull, isURL } from 'validator';

export default class PackageGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.argument('name', { type: String, required: false });
	}
	prompting() {
		return this._prompt(compact([
			!this.options.name && {
				message:  'Package name',
				name:     'name',
				type:     'input',
				validate: (name) => !isNull(name) || 'This cannot be empty',
			},
			{
				message: 'Package description',
				name:    'description',
				type:    'input',
			},
			!this.options.homepage && {
				message:  'Package homepage',
				name:     'homepage',
				type:     'input',
				validate: (url) => isNull(url) || isURL(url) || 'Must a valid URL or be empty',
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
			!this.options.org && {
				message: 'Github user (or organization)',
				name:    'org',
				type:    'input',
			},
			!this.options.repository && {
				message: 'Git repository',
				name:    'repository',
				type:    'input',
			},
		]));
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
	_spawn(command, args, opt) {
		return new Promise((resolve, reject) => {
			const spawn = this.spawnCommand(command, args, Object.assign({ stdio: 'pipe' }, opt));
			let error = '';
			let value = '';

			spawn.stderr.on('data', (data) => {
				error += data.toString();
			});

			spawn.stdout.on('data', (data) => {
				value += data.toString();
			});

			spawn.on('close', (code) => {
				if (code) {
					reject(error);
				} else {
					resolve(value);
				}
			});
		});
	}
}
