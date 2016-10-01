import compact from 'lodash.compact';
import fs from 'fs';
import promisify from 'es6-promisify';
import { BaseGenerator } from '../utils';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('codeQuality');
		this.option('continuous');
	}
	initializing() {
		this.composeWith('full-stack:api', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:bithound', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:codecov', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:github', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:github-pages', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:heroku', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:license', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:npm', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:server', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:tests', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:travis', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
		this.composeWith('full-stack:website', { options: { skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });

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
						this.packageName = match[3];
					},
					() => null
				),
				() => this._spawn('git', ['init'])
			)
			.then(() => {
				if (!this.packageName) {
					this.suggestedPackageName = process.cwd().slice(process.cwd().lastIndexOf('/') + 1);
				}
			});
	}
	prompting() {
		return this.prompt(compact([
			this.options.continuous === undefined && {
				message: 'Would you like to have continuous integration?',
				name:    'continuous',
				type:    'confirm',
			},
			this.options.codeQuality === undefined && {
				message: 'Would you like to lint & format your code?',
				name:    'codeQuality',
				type:    'confirm',
			},
			this.packageName === undefined && {
				message: 'What is the package name?',
				name:    'packageName',
				type:    'input',
				default: this.suggestedPackageName,
			},
			this.githubOrg === undefined && {
				message: 'What is your github username (or organization)?',
				name:    'githubOrg',
				type:    'input',
			},
		]))
			.then((answers) => {
				const options = Object.assign({}, this.options, answers);

				this.composeWith('full-stack:hooks', { options: { codeQuality: options.codeQuality, validateCommit: options.continuous, skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
				this.composeWith('full-stack:package', { options: { codeQuality: options.codeQuality, name: options.packageName, githubOrg: options.githubOrg, release: options.continuous, skipCache: this.options.skipCache, skipInstall: this.options.skipInstall } });
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
		// TODO babel setup
	}
	end() {
		return this._spawn('git', ['add', '.'])
			.then(() => this._spawn('git', ['commit']))
			.catch((err) => console.log(err));
	}
}
