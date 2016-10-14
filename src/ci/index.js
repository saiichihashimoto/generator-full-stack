import { BaseGenerator } from '../base';

export default class CIGenerator extends BaseGenerator {
	configuring() {
		this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'cz-conventional-changelog',
				'npm-run-all',
				'semantic-release',
				'validate-commit-msg',
			],
			{ saveDev: true }
		);
	}
	end() {
		return this._spawn('travis', ['enable'])
			.then(() => this._spawn('travis', ['settings', 'builds_only_with_travis_yml', '--enable']))
			.then(() => this._spawn('travis', ['settings', 'build_pushes', '--enable']))
			.then(() => this._spawn('travis', ['settings', 'build_pull_requests', '--disable']));
	}
}
