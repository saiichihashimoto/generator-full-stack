import fs from 'fs';
import promisify from 'es6-promisify';

import { BaseGenerator } from '../base';

export default class RepoGenerator extends BaseGenerator {
	initializing() {
		return promisify(fs.stat, fs)('.git')
			.then(
				() => this._spawn('git', ['config', '--get', 'remote.origin.url'])
					.catch(() => this.composeWith('full-stack:github-repo', { options: this.options })),
				() => {
					this.noRepo = true;
				}
			);
	}
	configuring() {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
	}
	end() {
		return (this.noRepo ? this._spawn('git', ['init']) : Promise.resolve())
			.then(() => this._spawn('git', ['add', '.']))
			.then(() => this._spawn('git', ['commit', '-m', '"chore(package): init"']));
	}
}
