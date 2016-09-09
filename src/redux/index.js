import { Base } from 'yeoman-generator';

export default class ReduxGenerator extends Base {
	prompting() {
		this.log('redux:prompting'); // TODO
	}
	configuring() {
		this.log('redux:configuring'); // TODO
	}
	writing() {
		this.log('redux:writing'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
