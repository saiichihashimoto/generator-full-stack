import compact from 'lodash.compact';
import { BaseGenerator } from '../utils';

export default class ContinuousGenerator extends BaseGenerator {
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
				this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
				this.npmInstall(['semantic-release'], { saveDev: true });

				if (options.test) {
					this.composeWith('full-stack:mocha', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
					if (options.coverage) {
						this.composeWith('full-stack:codecov', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
					}
				}
				if (options.analysis) {
					this.composeWith('full-stack:bithound', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
				}
			});
	}
}
