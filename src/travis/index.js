import { BaseGenerator } from '../base';

export default class TravisGenerator extends BaseGenerator {
	configuring() {
		this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
	}
	end() {
		return this._spawn('travis', ['version'])
			.catch(() => this._spawn('gem', ['install', 'travis']))
			.then(() => this._spawn('travis', ['enable']))
			.then(() => this._spawn('travis', ['settings', 'builds_only_with_travis_yml', '--enable']))
			.then(() => this._spawn('travis', ['settings', 'build_pushes', '--enable']))
			.then(() => this._spawn('travis', ['settings', 'build_pull_requests', '--disable']));
	}
}
