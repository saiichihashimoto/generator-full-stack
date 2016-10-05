import compact from 'lodash.compact';
import fs from 'fs';
import promisify from 'es6-promisify';
import { BaseGenerator } from '../utils';

export default class AppGenerator extends BaseGenerator {
	initializing() {
		return promisify(fs.stat, fs)('.git')
			.then(
				() => this._spawn('git', ['config', '--get', 'remote.origin.url']).then(
					(remoteRepo) => {
						this.remoteRepo = remoteRepo;
						const match = this.remoteRepo.match(/git@(.+):(.+)\/(.+)\.git/);
						if (!match) {
							return;
						}
						this.githubOrg = match[2];
						this.name = match[3];
					},
					() => null
				),
				() => this._spawn('git', ['init'])
			)
			.then(() => {
				if (!this.name) {
					this.suggestedPackageName = process.cwd().slice(process.cwd().lastIndexOf('/') + 1);
				}
			});
	}
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
	}
	configuring() {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
		// TODO babel setup
	}
	end() {
		// TODO git add remote (if necessary)
		// TODO git add
		// TODO git commit
		// TODO git push
	}
}
