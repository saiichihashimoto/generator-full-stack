import { BaseGenerator } from '../base';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('name', { type: String });
		this.option('description', { type: String });
		this.option('ci', { defaults: true, type: Boolean });
		this.option('repo', { defaults: true, type: Boolean });
		this.option('server', { defaults: true, type: Boolean });
		this.option('style', { defaults: true, type: Boolean });
		this.option('test', { defaults: true, type: Boolean });
	}
	initializing() {
		if (this.options.server) {
			this.composeWith('full-stack:server', { options: this._passableOptions('server') });
		}
		if (this.options.repo) {
			this.composeWith('full-stack:repo', { options: this._passableOptions('repo') });
		}
		if (this.options.ci) {
			this.composeWith('full-stack:ci', { options: this._passableOptions('ci') });
		}
		if (this.options.test) {
			this.composeWith('full-stack:test', { options: this._passableOptions('test') });
		}
		if (this.options.style) {
			this.composeWith('full-stack:style', { options: this._passableOptions('style') });
		}
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
	}
}
