import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	initializing() {
		this.composeWith('full-stack:package');
	}
}
