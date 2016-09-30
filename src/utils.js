import { Base } from 'yeoman-generator';

export class BaseGenerator extends Base {
	static accomplishments = []
	_weHave(accomplishment) {
		BaseGenerator.accomplishments.push(accomplishment);
	}
	_whatDidWeDo() {
		BaseGenerator.accomplishments.forEach((accomplishment) => {
			this.log('We ' + accomplishment + '.');
		});
	}
}
