import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.argument('name', { desc: 'Package name', type: String, required: false });
		this.option('restful', { desc: 'Include RESTful API', type: Boolean });
	}
	prompting() {
		return Promise.resolve()
			.then(() => {
				return this.prompt(compact([
					!this.name && {
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
				]))
				.then((answers) => Object.assign(this, answers));
			})
			.then(() => {
				return this.prompt([
					{
						message: 'Application platforms',
						name:    'platforms',
						type:    'checkbox',
						choices: [
							{ name: 'Website', value: 'web' },
							{ name: 'Server', value: 'server' },
						],
					},
				])
				.then((answers) => Object.assign(this.options, answers));
			})
			.then(() => {
				if (!this.options.platforms.includes('web')) {
					this.options.renderOn = 'nowhere';
					return;
				}
				return this.prompt(compact([
					!this.options.renderOn && {
						message: 'When document markup is rendered',
						name:    'renderOn',
						type:    'list',
						default: this.options.platforms.includes('server') ? 'serve' : 'build',
						choices: compact([
							this.options.platforms.includes('server') && { name: 'On server', value: 'serve' },
							{ name: 'On build', value: 'build' },
							{ name: 'On browser mount (not recommended)', value: 'mount' },
						]),
					},
				]))
				.then((answers) => Object.assign(this.options, answers));
			})
			.then(() => {
				if (!this.options.platforms.includes('server')) {
					this.options.restful = false;
					return;
				}
				return this.prompt(compact([
					(this.options.restful === undefined) && {
						message: 'Include RESTful API',
						name:    'restful',
						type:    'confirm',
						default: true,
					},
				]))
				.then((answers) => Object.assign(this.options, answers));
			})
			.then(() => {
				if (this.options.platforms.includes('server')) {
					this.composeWith('full-stack:server', { options: this.options });
				}
				if (this.options.platforms.includes('web')) {
					this.composeWith('full-stack:web', { options: this.options });
				}
			});
	}
	writing() {
		this.fs.copy(this.templatePath('../../../.codecov.yml'), this.destinationPath('.codecov.yml'));
		this.fs.copy(this.templatePath('../../../.editorconfig'), this.destinationPath('.editorconfig'));
		this.fs.copy(this.templatePath('../../../.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('../../../.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('../../../.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.fs.copy(this.templatePath('assets/images/logo.png'), this.destinationPath('assets/images/logo.png'));
		this.fs.copyTpl(this.templatePath('Procfile.dev.ejs'), this.destinationPath('Procfile.dev'), Object.assign({}, this, this.options));
		this.fs.copyTpl(this.templatePath('package.json.ejs'), this.destinationPath('package.json'), Object.assign({}, this, this.options));
		this.fs.write(this.destinationPath('.env'), '');
	}
	installing() {
		this.npmInstall(
			[
				'babel-core',
				'babel-plugin-transform-class-properties',
				'babel-preset-es2015',
				'babel-preset-react',
			],
			{ save: true }
		);
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
				'eslint-plugin-react',
				'ghooks',
				'istanbul',
				'jsonlint',
				'last-release-github',
				'mocha',
				'nock',
				'npm-run-all',
				'semantic-release',
				'sinon',
				'sinon-chai',
				'sort-package-json',
				'validate-commit-msg',
			],
			{ saveDev: true }
		);
	}
}
