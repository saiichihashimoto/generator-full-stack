import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.argument('name', { type: String, desc: 'Package name' });
		this.option('renderOn', { type: String, desc: 'When the documents should be rendered (build/serve/mount)' });
	}
	prompting() {
		return Promise.resolve()
			.then(() => {
				return this.prompt([{
					message: 'Platforms',
					name:    'platforms',
					type:    'checkbox',
					choices: [
						{ name: 'Website', value: 'web' },
						{ name: 'Server', value: 'server' },
					],
				}])
					.then((answers) => Object.assign(this.options, answers));
			})
			.then(() => {
				if (!this.options.platforms.includes('web')) {
					return;
				}
				return this.prompt([!this.options.renderOn && {
					message: 'Render on',
					name:    'renderOn',
					type:    'expand',
					choices: [
						{ name: 'Build', value: 'build' },
						{ name: 'Serve', value: 'serve' },
						{ name: 'Mount', value: 'mount' },
					],
				}])
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
		this.fs.copy(this.templatePath('../../../.editorconfig'), this.destinationPath('.editorconfig'));
		this.fs.copy(this.templatePath('../../../.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('../../../.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
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
