import { Base } from 'yeoman-generator';

export default class HerokuGenerator extends Base {
	prompting() {
		this.log('heroku:prompting'); // TODO
	}
	configuring() {
		this.log('heroku:configuring'); // TODO
	}
	writing() {
		this.log('heroku:writing'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
