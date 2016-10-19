import { BaseGenerator } from '../base';

export default class StyleGenerator extends BaseGenerator {
	configuring() {
		this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('.stylelintrc'), this.destinationPath('.stylelintrc'));
		this.npmInstall(
			[
				'babel-eslint',
				'eslint',
				'eslint-config-xo',
				'eslint-plugin-babel',
				'eslint-plugin-react',
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
			],
			{ saveDev: true }
		);
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'ghooks',
				'jsonlint',
				'npm-run-all',
				'sort-package-json',
			],
			{ saveDev: true }
		);
	}
}
