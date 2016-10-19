import fs from 'fs';
import promisify from 'es6-promisify';

import { BaseGenerator } from '../base';

export default class RepoGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('github', { defaults: true, type: Boolean });
	}
	configuring() {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

		return promisify(fs.stat, fs)('.git')
			.catch(() => this._spawn('git', ['init']))
			.then(
				() => this._spawn('git', ['config', '--get', 'remote.origin.url'])
					.then((remoteRepo) => !remoteRepo.length && Promise.reject())
					.catch(() => this.options.github && this.composeWith('full-stack:github', { options: this._passableOptions('github') }))
			);
	}
	end() {
		return this._spawn('git', ['add', '.'])
			.then(() => this._spawn('git', ['commit', '-m', 'chore(package): init']));
	}
}
