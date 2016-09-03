import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	initializing() {
		this.argument('name', { type: String, required: true });
		this.composeWith('full-stack:package', { args: [this.name] });
		this.composeWith('full-stack:webpack', { args: [this.name] });
	}
}
