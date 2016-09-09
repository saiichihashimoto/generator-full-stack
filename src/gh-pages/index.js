import { Base } from 'yeoman-generator';

export default class GithubPagesGenerator extends Base {
	prompting() {
		this.log('gh-pages:prompting'); // TODO
	}
	configuring() {
		this.log('gh-pages:configuring'); // TODO
	}
	writing() {
		this.log('gh-pages:writing'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
