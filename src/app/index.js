import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
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
				this.didntHaveGit = true;
			})
			.then(() => {
				this.composeWith('full-stack:package', { options: Object.assign({}, this.options) });
			});
	}
	prompting() {
		return Promise.resolve()
			.then(() => {
				if (this.options.web !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'Website',
					name:    'web',
					type:    'confirm',
					default: true,
				}])
					.then(() => {
						if (!this.options.web) {
							this.options = Object.assign({}, this.options, { render: null });
							return;
						}
						if (this.options.render !== undefined) {
							return;
						}
						return this._prompt([{
							message: 'Render on',
							name:    'render',
							type:    'list',
							default: 'server',
							choices: [
								{ name: 'Server', value: 'server' },
								{ name: 'Build', value: 'web' },
								{ name: 'Mount', value: null },
							],
						}])
							.then(() => {
								if (this.options.render === 'server') {
									this.options = Object.assign({}, this.options, { server: true });
								}
							});
					});
			})
			.then(() => {
				if (this.options.api !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'HTTP API',
					name:    'api',
					type:    'confirm',
					default: true,
				}])
					.then(() => {
						if (this.options.api) {
							this.options = Object.assign({}, this.options, { server: true });
						}
					});
			})
			.then(() => {
				if (this.options.server !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'Server',
					name:    'server',
					type:    'confirm',
					default: false,
				}]);
			})
			.then(() => {
				if (this.options.state !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'State',
					name:    'state',
					type:    'list',
					default: 'redux',
					choices: [
						{ name: 'Redux', value: 'redux' },
						{ name: 'None', value: null },
					],
				}]);
			})
			.then(() => {
				if (this.options.web) {
					this.composeWith('full-stack:web', { options: Object.assign({}, this.options) });
				}
				if (this.options.server) {
					this.composeWith('full-stack:server', { options: Object.assign({}, this.options) });
				}
				if (this.options.api) {
					this.composeWith('full-stack:api', { options: Object.assign({}, this.options) });
				}
				if (this.options.state) {
					this.composeWith('full-stack:' + this.options.state, { options: Object.assign({}, this.options) });
				}
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('../../../.codecov.yml'), this.destinationPath('.codecov.yml'));
		this.fs.copy(this.templatePath('../../../.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('../../../.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
		this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('assets/images/logo.png'), this.destinationPath('assets/images/logo.png'));
		this.fs.write(this.destinationPath('.env'), '');
		this.fs.write(this.destinationPath('Procfile.dev'), '');

		this.npmInstall(
			[
				'babel-eslint',
				'chai',
				'chai-as-promised',
				'codecov.io',
				'cz-conventional-changelog',
				'eslint',
				'eslint-config-xo',
				'eslint-plugin-babel',
				'ghooks',
				'istanbul',
				'jsonlint',
				'last-release-github',
				'mocha',
				'nock',
				'semantic-release',
				'sinon',
				'sinon-chai',
				'validate-commit-msg',
			],
			{ saveDev: true }
		);

		this.npmInstall(
			[
				'babel-core',
				'babel-plugin-transform-class-properties',
				'babel-preset-es2015',
				'babel-preset-react',
			],
			{ save: true }
		);

		if (this.didntHaveGit) {
			let promise = this._spawn('git', ['init']);
			if (this.options.repository) {
				promise = promise.then(() => this._spawn('git', ['remote', 'add', 'origin', this.options.repository]));
			}

			return promise;
		}
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
			this.log(command, '"' + args.join('" "') + '"');
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
