import { BaseGenerator } from '../base';

export default class AppGenerator extends BaseGenerator {
	constructor(...args) {
		super(...args);

		this.option('name', { type: String });
		this.option('description', { type: String });
	}
	initializing() {
		this.composeWith('full-stack:server', { options: this._passableOptions('server') });
		this.composeWith('full-stack:repo', { options: this._passableOptions('repo') });
		this.composeWith('full-stack:ci', { options: this._passableOptions('ci') });
		this.composeWith('full-stack:test', { options: this._passableOptions('test') });
		this.composeWith('full-stack:style', { options: this._passableOptions('style') });
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
	}
}
