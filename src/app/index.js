import compact from 'lodash.compact';
import { BaseGenerator } from '../utils';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('format');
		this.option('lint');
	}
	prompting() {
		return this.prompt(compact([
			this.options.lint === undefined && {
				message: 'Would you like to have linting scripts?',
				name:    'lint',
				type:    'confirm',
			},
			this.options.format === undefined && {
				message: 'Would you like to have formatting scripts?',
				name:    'format',
				type:    'confirm',
			},
		]))
			.then((answers) => {
				this.composeWith('full-stack:package', { options: { lint: this.options.lint || answers.lint, format: this.options.format || answers.format } });
				this.composeWith('full-stack:hooks');

				// FIXME Need to deal with
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
			});
	}
}
