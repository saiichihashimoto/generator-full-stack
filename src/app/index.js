import { BaseGenerator } from '../base';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('description', { type: String });
		this.option('name', { type: String });
	}
	initializing() {
		this.composeWith('full-stack:repo', { options: this._passableOptions('repo') });
		this.composeWith('full-stack:ci', { options: this._passableOptions('ci') });
		this.composeWith('full-stack:lint', { options: this._passableOptions('lint') });
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
	}
	/* TODO
	prompting() {
		let options = Object.assign({}, this.options);

		return Promise.resolve()
			.then(() => this.prompt(compact([
				this.name === undefined && {
					message: 'Package name?',
					name:    'name',
					type:    'input',
					default: this.suggestedPackageName,
				},
				{
					message: 'Package description?',
					name:    'description',
					type:    'input',
				},
				this.githubOrg === undefined && {
					message: 'GitHub username (or organization)?',
					name:    'githubOrg',
					type:    'input',
				},
				options.github === undefined && {
					message: 'Setup GitHub?',
					name:    'github',
					type:    'confirm',
				},
				options.codeQuality === undefined && {
					message: 'Code Quality?',
					name:    'codeQuality',
					type:    'confirm',
				},
				options.continuous === undefined && {
					message: 'Continuous?',
					name:    'continuous',
					type:    'confirm',
				},
			])))
			.then((answers) => {
				options = Object.assign({}, options, answers);
			})
			.then(() => {
				this.composeWith('full-stack:license', { options });
				if (options.codeQuality || options.continuous) {
					this.composeWith('full-stack:codeQuality', { options: Object.assign({}, options, { validateCommit: options.continuous }) });
				}
				if (options.github) {
					this.composeWith('full-stack:github', { options });
				}

				this.composeWith('full-stack:application', { options });
				if (options.continuous) {
					this.composeWith('full-stack:continuous', { options });
				}

				this.options = options;
			});
	*/
}
