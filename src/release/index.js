import compact from 'lodash.compact';
import { BaseGenerator } from '../utils';

export default class ReleaseGenerator extends BaseGenerator {
	prompting() {
		let options = Object.assign({}, this.options);

		return Promise.resolve()
			.then(() => this.prompt(compact([
				{
					message: 'Releasing?',
					name:    'releases',
					type:    'checkbox',
					choices: [
						{
							name:     'GitHub Pages',
							value:    'github-pages',
							disabled: !options.website && 'No Website',
							checked:  options.website && !options.server,
						},
						{
							name:     'Heroku',
							value:    'heroku',
							disabled: !options.server && 'No Server',
							checked:  options.server,
						},
						{
							name:    'NPM',
							value:   'npm',
							checked: !options.server && !options.website,
						},
					],
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => {
				if (options.releases.includes('github-pages')) {
					this.composeWith('full-stack:github-pages', { options });
				}
				if (options.releases.includes('heroku')) {
					this.composeWith('full-stack:heroku', { options });
				}
				if (options.releases.includes('npm')) {
					this.composeWith('full-stack:npm', { options });
				}
			});
	}
}
