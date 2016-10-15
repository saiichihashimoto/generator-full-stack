import fs from 'fs';
import promisify from 'es6-promisify';

import { BaseGenerator } from '../base';

export default class RepoGenerator extends BaseGenerator {
	initializing() {
		// TODO Call this in full-stack:app but AFTER github-repo
		this.composeWith('full-stack:lint', { options: this._passableOptions('lint') });

		return promisify(fs.stat, fs)('.git')
			.then(
				() => {
					this.isRepo = true;
					return this._spawn('git', ['config', '--get', 'remote.origin.url'])
						.then(
							(remoteRepo) => {
								if (!remoteRepo.length) {
									return;
								}
								this.hasRemote = true;
							},
							() => null
						);
				},
				() => null
			)
			.then(() => {
				if (!this.hasRemote) {
					this.composeWith('full-stack:github-repo', { options: this._passableOptions('github-repo') });
				}
				// TODO Call this in full-stack:app but AFTER github-repo
				this.composeWith('full-stack:ci', { options: this._passableOptions('ci') });
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
	}
	end() {
		return (this.isRepo ? Promise.resolve() : this._spawn('git', ['init']))
			.then(() => this._spawn('git', ['add', '.']))
			.then(() => this._spawn('git', ['commit', '-m', '"chore(package): init"']));
	}
}
