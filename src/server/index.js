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
						{ name: 'Don\'t worry about it', value: null },
					],
				}]);
			})
			.then(() => {
				switch (this.options.deploy) {
					case 'heroku':
						this.composeWith('full-stack:heroku', { options: Object.assign({}, this.options) });
						break;
					default:
						break;
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

		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.npmInstall(
			[
				'raven',
			],
			{ save: true }
		);

		this.fs.copyTpl(this.templatePath('index.js.ejs'), this.destinationPath('index.js'), Object.assign({}, this, this.options));
		this.npmInstall(
			[
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				'helmet',
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
	writing() {
		this.fs.write(
			this.destinationPath('Procfile.dev'),
			[this.fs.read(this.templatePath('Procfile.dev')), this.fs.read(this.destinationPath('Procfile.dev'))].join('\n').replace(/\n+/, '\n')
		);
		this.npmInstall(
			[
				'nodemon',
			],
			{ saveDev: true }
		);
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
