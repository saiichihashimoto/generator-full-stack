import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	initializing() {
		this.argument('name', { type: String, required: true });
	}
	foo() {
		this.log('foo');
	}
}
