import { Base } from 'yeoman-generator';

export default class ServerGenerator extends Base {
	prompting() {
		return Promise.resolve()
			.then(() => {
				if (this.options.deploy !== undefined) {
					return;
				}
				return this._prompt([{
					message: 'Deploy',
					name:    'deploy',
					type:    'list',
					default: 'heroku',
					choices: [
						{ name: 'Heroku', value: 'heroku' },
						{ name: 'None', value: null },
					],
				}]);
			})
			.then(() => {
				if (this.options.deploy) {
					this.composeWith('full-stack:' + this.options.deploy, { options: Object.assign({}, this.options) });
				}
			});
	}
	configuring() {
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));

		this.npmInstall(
			[
				'babel-cli',
			],
			{ save: true }
		);
	}
	writing() {
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.fs.copyTpl(this.templatePath('index.js.ejs'), this.destinationPath('index.js'), Object.assign({}, this, this.options));
		this.fs.write(
			this.destinationPath('Procfile.dev'),
			[this.fs.read(this.templatePath('Procfile.dev')), this.fs.read(this.destinationPath('Procfile.dev'))].join('\n').replace(/\n{2,}/, '\n')
		);

		this.npmInstall(
			[
				'nodemon',
			],
			{ saveDev: true }
		);

		this.npmInstall(
			[
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				'helmet',
				'raven',
			],
			{ save: true }
		);

		if (this.options.render === 'server') {
			this.npmInstall(
				[
					'ejs',
				],
				{ save: true }
			);
		}
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
