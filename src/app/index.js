import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	initializing() {
		this.composeWith('full-stack:package', { options: Object.assign({}, this.options) });
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
									this.options = Object.assign({}, this.options, { server: null });
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
				if (this.options.web) {
					this.composeWith('full-stack:web', { options: Object.assign({}, this.options) });
				}
				if (this.options.render) {
					this.composeWith('full-stack:render', { options: Object.assign({}, this.options) });
				}
				if (this.options.server) {
					this.composeWith('full-stack:server', { options: Object.assign({}, this.options) });
				}
				if (this.options.api) {
					this.composeWith('full-stack:api', { options: Object.assign({}, this.options) });
				}
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('../../../.codecov.yml'), this.destinationPath('.codecov.yml'));
		this.fs.copy(this.templatePath('../../../.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('../../../.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
		this.fs.copy(this.templatePath('assets/images/logo.png'), this.destinationPath('assets/images/logo.png'));
		this.fs.write(this.destinationPath('.env'), '');
		this.fs.write(this.destinationPath('Procfile.dev'), '');
		this.npmInstall(
			[
				'chai',
				'chai-as-promised',
				'codecov.io',
				'cz-conventional-changelog',
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

		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.npmInstall(
			[
				'babel-core',
				'babel-plugin-transform-class-properties',
				'babel-preset-es2015',
				'babel-preset-react',
			],
			{ save: true }
		);

		this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
		this.npmInstall(
			[
				'babel-eslint',
				'eslint',
				'eslint-config-xo',
				'eslint-plugin-babel',
			],
			{ saveDev: true }
		);
	}
	end() {
		this.log('app:end run formatall'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
