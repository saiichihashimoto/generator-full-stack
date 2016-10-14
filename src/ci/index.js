import compact from 'lodash.compact';

import { BaseGenerator } from '../base';

export default class CIGenerator extends BaseGenerator {
	prompting() {
		let options = Object.assign({}, this.options);

		return Promise.resolve()
			.then(() => this.prompt(compact([
				options.test === undefined && {
					message: 'Tests?',
					name:    'test',
					type:    'confirm',
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => this.prompt(compact([
				options.test && options.coverage === undefined && {
					message: 'Coverage?',
					name:    'coverage',
					type:    'confirm',
				},
				options.analysis === undefined && {
					message: 'Analysis?',
					name:    'analysis',
					type:    'confirm',
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => {
				if (options.test) {
					this.composeWith('full-stack:mocha', { options });
					if (options.coverage) {
						this.composeWith('full-stack:codecov', { options });
					}
				}
				if (options.analysis) {
					this.composeWith('full-stack:bithound', { options });
				}
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'cz-conventional-changelog',
				'npm-run-all',
				'semantic-release',
				'validate-commit-msg',
			],
			{ saveDev: true }
		);
	}
	end() {
		return this._spawn('travis', ['enable']);
	}
}
