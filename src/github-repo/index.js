import GitHubApi from 'github';

import { BaseGenerator } from '../base';

const github = new GitHubApi();

// FIXME Need a better way to authenticate
github.authenticate({
	type:  'token',
	token: process.env.GH_TOKEN,
});

export default class GitHubRepoGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('description', { type: String });
		this.option('name', { type: String });
		this.option('user', { type: String });
	}
	writing() {
		// TODO Move to template
		this.fs.extendJSON(
			this.destinationPath('package.json'),
			Object.assign(
				{},
				this.fs.readJSON(this.templatePath('package.json')),
				{
					bugs: {
						url: 'https://github.com/' + this.options.user + '/' + this.options.name + '/issues',
					},
					repository: {
						type: 'git',
						url:  'git+https://github.com/' + this.options.user + '/' + this.options.name + '.git',
					},
				}
			)
		);
	}
	end() {
		return github.repos.create({
			name:               this.options.name,
			description:        this.options.description,
			has_wiki:           false,
			allow_rebase_merge: false,
			allow_squash_merge: false,
		})
			.then(() => this._spawn('git', ['remote', 'add', 'origin', 'git@github.com:' + this.options.user + '/' + this.options.name + '.git']))
			.then(() => this._spawn('git', ['push']))
			.then(() => Promise.all([
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: '5ebeff', name: 'optimization' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: '91ca55', name: 'new feature' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'cc317c', name: 'discussion' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'cc317c', name: 'idea' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'd2dae1', name: 'wont fix' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ee3f46', name: 'breaks experience' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ee3f46', name: 'edge case' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ee3f46', name: 'regression' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fbca04', name: 'greenkeeper' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fbca04', name: 'requires investigation' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fbca04', name: 'watchlist' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fef2c0', name: 'chore' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fef2c0', name: 'development' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fef2c0', name: 'legal' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fef2c0', name: 'market research' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'fef2c0', name: 'refactor' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ffc274', name: 'copy' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ffc274', name: 'design' }),
				github.issues.createLabel({ user: this.options.user, repo: this.options.name, color: 'ffc274', name: 'user experience' }),
				github.issues.deleteLabel({ user: this.options.user, repo: this.options.name, name: 'help wanted' }),
				github.issues.deleteLabel({ user: this.options.user, repo: this.options.name, name: 'wontfix' }),
				github.issues.updateLabel({ user: this.options.user, repo: this.options.name, color: '5ebeff', name: 'enhancement', oldname: 'enhancement' }),
				github.issues.updateLabel({ user: this.options.user, repo: this.options.name, color: 'cc317c', name: 'question', oldname: 'question' }),
				github.issues.updateLabel({ user: this.options.user, repo: this.options.name, color: 'd2dae1', name: 'duplicate', oldname: 'duplicate' }),
				github.issues.updateLabel({ user: this.options.user, repo: this.options.name, color: 'd2dae1', name: 'invalid', oldname: 'invalid' }),
				github.issues.updateLabel({ user: this.options.user, repo: this.options.name, color: 'ee3f46', name: 'bug', oldname: 'bug' }),
			]));
	}
}
