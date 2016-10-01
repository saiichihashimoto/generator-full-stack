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
		this.composeWith('full-stack:api');
		this.composeWith('full-stack:bithound');
		this.composeWith('full-stack:codecov');
		this.composeWith('full-stack:github');
		this.composeWith('full-stack:github-pages');
		this.composeWith('full-stack:heroku');
		this.composeWith('full-stack:license');
		this.composeWith('full-stack:npm');
		this.composeWith('full-stack:server');
		this.composeWith('full-stack:tests');
		this.composeWith('full-stack:travis');
		this.composeWith('full-stack:website');

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

				this.composeWith('full-stack:hooks', { options: { codeQuality: options.codeQuality, validateCommit: options.continuous } });
				this.composeWith('full-stack:package', { options: { codeQuality: options.codeQuality, name: options.packageName, githubOrg: options.githubOrg, release: options.continuous } });
			});
	}
	configuring() {
		// TODO babel setup
	}
	end() {
		return this._spawn('git', ['add', '.'])
			.then(() => this._spawn('git', ['commit', '-m', '"chore(package): initializing package"']))
			.catch(() => null);
	}
}
