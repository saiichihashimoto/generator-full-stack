import { Base } from 'yeoman-generator';

export default class RenderGenerator extends Base {
	prompting() {
		this.log('render:prompting'); // TODO
	}
	configuring() {
		this.log('render:configuring'); // TODO
	}
	writing() {
		this.log('render:writing'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
