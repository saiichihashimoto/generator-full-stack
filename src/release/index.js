import { BaseGenerator } from '../utils';

export default class ReleaseGenerator extends BaseGenerator {
	prompting() {
		const options = Object.assign({}, this.options);

		return Promise.resolve()
			.then(() => {
				this.composeWith('full-stack:github-pages', { options });
				this.composeWith('full-stack:heroku', { options });
				this.composeWith('full-stack:npm', { options });
			});
	}
}
