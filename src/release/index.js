import { BaseGenerator } from '../utils';

export default class ReleaseGenerator extends BaseGenerator {
	prompting() {
		return Promise.resolve()
			.then(() => {
				this.composeWith('full-stack:github-pages', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
				this.composeWith('full-stack:heroku', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
				this.composeWith('full-stack:npm', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
			});
	}
}
