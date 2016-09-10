import { compact } from 'lodash';
import { Base } from 'yeoman-generator';
import { isNull, isURL } from 'validator';

export default class PackageGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.argument('name', { type: String, required: false });
	}
	initializing() {
		return this._spawn('git', ['config', '--get', 'remote.origin.url'])
			.then((repo) => {
				if (!repo) {
					return;
				}
				const match = repo.match(/git@(.+):(.+)\/(.+)\.git/);
				if (!match) {
					this.options.repository = repo;
					return;
				}
				this.options.name = this.options.name || match[3];
				this.options.org = this.options.org || match[2];
				if (match[1] === 'github.com') {
					this.options.homepage = this.options.homepage || ('https://github.com/' + match[2] + '/' + match[3]);
					this.options.repository = this.options.repository || ('git+https://github.com/' + match[2] + '/' + match[3] + '.git');
				}
			})
			.catch(() => {
				this.spawnCommand('git', ['init']);
				this.didntHaveGit = true;
			});
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
		let promise = Promise.resolve();

		if (this.didntHaveGit && this.options.repository) {
			promise = promise.then(() => this._spawn('git', ['remote', 'add', 'origin', this.options.repository]));
		}

		this.fs.copyTpl(this.templatePath('package.json.ejs'), this.destinationPath('package.json'), Object.assign({}, this, this.options));
		this.npmInstall(
			[
				'npm-run-all',
				'sort-package-json',
			],
			{ saveDev: true }
		);

		return promise;
	}
	end() {
		return this._spawn('git', ['add', '.'])
			.then(() => this._spawn('git', ['commit', '-m', 'chore(package): Initialize package using generator-full-stack']));
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
