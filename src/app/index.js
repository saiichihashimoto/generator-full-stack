import compact from 'lodash.compact';
import { BaseGenerator } from '../utils';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
		this.option('continuous');
		this.option('format');
	}
	initializing() {
		this.composeWith('full-stack:api');
		this.composeWith('full-stack:bithound');
		this.composeWith('full-stack:codecov');
		this.composeWith('full-stack:git');
		this.composeWith('full-stack:github');
		this.composeWith('full-stack:github-pages');
		this.composeWith('full-stack:heroku');
		this.composeWith('full-stack:license');
		this.composeWith('full-stack:npm');
		this.composeWith('full-stack:server');
		this.composeWith('full-stack:tests');
		this.composeWith('full-stack:travis');
		this.composeWith('full-stack:website');
	}
	prompting() {
		return this.prompt(compact([
			this.options.codeQuality === undefined && {
				message: 'Would you like to lint & format your code?',
				name:    'codeQuality',
				type:    'confirm',
			},
			this.options.format === undefined && {
				message: 'Would you like to have continuous integration?',
				name:    'continuous',
				type:    'confirm',
			},
		]))
			.then((answers) => {
				const options = Object.assign({}, this.options, answers);

				this.composeWith('full-stack:hooks', { options: { validateCommit: options.continuous, codeQuality: options.codeQuality } });
				this.composeWith('full-stack:package', { options: { codeQuality: options.codeQuality } });
			});
	}
}
