import compact from 'lodash.compact';
import { BaseGenerator } from '../utils';

export default class ApplicationGenerator extends BaseGenerator {
	prompting() {
		let options = Object.assign({}, this.options);

		return Promise.resolve()
			.then(() => this.prompt(compact([
				options.website === undefined && {
					message: 'Website?',
					name:    'website',
					type:    'confirm',
				},
				options.server === undefined && {
					message: 'Server?',
					name:    'server',
					type:    'confirm',
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => this.prompt(compact([
				options.server && options.website && options.api === undefined && {
					message: 'Restful API?',
					name:    'api',
					type:    'confirm',
				},
				options.release === undefined && {
					message: 'Releases?',
					name:    'release',
					type:    'confirm',
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => {
				if (options.server && options.website && options.api) {
					this.composeWith('full-stack:api', { options: { skipCache: options.skipCache, skipInstall: options.skipInstall } });
				}
				if (options.server) {
					this.composeWith('full-stack:server', { options: { skipCache: options.skipCache, skipInstall: options.skipInstall } });
				}
				if (options.website) {
					this.composeWith('full-stack:website', { options: { skipCache: options.skipCache, skipInstall: options.skipInstall } });
				}

				if (options.release) {
					this.composeWith('full-stack:release', { options: { skipCache: options.skipCache, skipInstall: options.skipInstall } });
				}
			});
	}
}
