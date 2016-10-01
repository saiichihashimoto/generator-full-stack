import fs from 'fs';
import promisify from 'es6-promisify';
import { BaseGenerator } from '../utils';

export default class GitGenerator extends BaseGenerator {
	initializing() {
		return promisify(fs.stat, fs)('.git').then(
			() => {
				this.isRepo = true;
				return this._spawn('git', ['config', '--get', 'remote.origin.url']).then(
					(remoteRepo) => {
						this.remoteRepo = remoteRepo;
						const match = this.remoteRepo.match(/git@(.+):(.+)\/(.+)\.git/);
						if (!match) {
							return;
						}
						this.github = {
							org:  match[2],
							name: match[3],
						};
					},
					() => null);
			},
			() => null);
	}
	configuring() {
		if (this.isRepo) {
			return;
		}
		return this._spawn('git', ['init']);
	}
	writing() {
		if (this.remoteRepo) {
			if (this.github) {
				this.fs.extendJSON(this.destinationPath('package.json'), {
					repository: {
						type: 'git',
						url:  'git+https://github.com/' + this.github.org + '/' + this.github.name + '.git',
					},
				});
			} else {
				this.fs.extendJSON(this.destinationPath('package.json'), {
					repository: {
						type: 'git',
						url:  this.remoteRepo,
					},
				});
			}
		}
	}
	end() {
		return this._spawn('git', ['add', '.'])
			.then(() => this._spawn('git', ['commit', '-m', '"chore(package): initializing package"']))
			.catch(() => null);
	}
}
