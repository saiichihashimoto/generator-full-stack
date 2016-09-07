import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.argument('name', { type: String, desc: 'Package name' });

		this.option('dynamic', { type: Boolean, desc: 'If the content will be dynamically rendered' });
	}
	prompting() {
		return Promise.resolve()
			.then(() => this.prompt(compact([
				(this.options.dynamic === undefined) && {
					message: 'Will the content be dynamically rendered?',
					name:    'dynamic',
					type:    'confirm',
					default: true,
				},
			])))
			.then((answers) => {
				if (answers.dynamic !== undefined) {
					this.options.dynamic = answers.dynamic;
				}
			})
			.then(() => {
				if (this.options.dynamic) {
					this.composeWith('full-stack:server', { options: { dynamic: this.options.dynamic, skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
				} else {
					this.composeWith('full-stack:web', { options: { dynamic: false, skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
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
