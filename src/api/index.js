import { Base } from 'yeoman-generator';

export default class APIGenerator extends Base {
	prompting() {
		return Promise.resolve()
			.then(() => {
				if (this.options.state !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'State',
					name:    'state',
					type:    'list',
					default: 'redux',
					choices: [
						{ name: 'Redux', value: 'redux' },
						{ name: 'Don\'t worry about it', value: null },
					],
				}]);
			})
			.then(() => {
				switch (this.options.state) {
					case 'redux':
						this.composeWith('full-stack:redux', { options: Object.assign({}, this.options) });
						break;
					default:
						break;
				}
			});
	}
	configuring() {
		this.log('api:configuring'); // TODO
	}
	writing() {
		this.log('api:writing'); // TODO
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
