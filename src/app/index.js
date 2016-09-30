import { BaseGenerator } from '../utils';

export default class AppGenerator extends BaseGenerator {
	initializing() {
		this.composeWith('full-stack:api');
		this.composeWith('full-stack:bithound');
		this.composeWith('full-stack:codecov');
		this.composeWith('full-stack:git');
		this.composeWith('full-stack:github');
		this.composeWith('full-stack:github-pages');
		this.composeWith('full-stack:heroku');
		this.composeWith('full-stack:hooks');
		this.composeWith('full-stack:license');
		this.composeWith('full-stack:npm');
		this.composeWith('full-stack:package');
		this.composeWith('full-stack:server');
		this.composeWith('full-stack:tests');
		this.composeWith('full-stack:travis');
		this.composeWith('full-stack:website');
	}
}
