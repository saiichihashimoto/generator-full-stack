import { BaseGenerator } from '../base';

export default class HerokuGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('name', { type: String });
	}
	end() {
		return this._spawn('heroku', ['version'])
			.catch(() => this._spawn('brew', ['install', 'heroku']))
			.then(() => this._spawn('heroku', ['apps:create', this.options.name]))
			.then(() => this._spawn('heroku', ['pipelines:create', this.options.name, '--app', this.options.name, '--stage', 'production']));
	}
}
