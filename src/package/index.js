import { BaseGenerator } from '../utils';

export default class PackageGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
		this.option('description');
		this.option('githubOrg');
		this.option('name');
		this.option('release');
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
		if (this.options.codeQuality) {
			this.fs.copy(this.templatePath('codeQuality/.eslintrc'), this.destinationPath('.eslintrc'));
			this.npmInstall(
				[
					'babel-eslint',
					'eslint',
					'eslint-config-xo',
					'eslint-plugin-babel',
					'eslint-plugin-react',
				],
				{ saveDev: true }
			);
		}
	}
	writing() {
		if (this.options.codeQuality) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('codeQuality/package.json')));
			this.npmInstall(
				[
					'jsonlint',
					'sort-package-json',
				],
				{ saveDev: true }
			);
		}
		if (this.options.release) {
			this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('release/package.json')));
			this.npmInstall(['semantic-release'], { saveDev: true });
		}
		if (this.options.codeQuality || this.options.release) {
			this.npmInstall(['npm-run-all'], { saveDev: true });
		}
	}
}
