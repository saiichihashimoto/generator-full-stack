import compact from 'lodash.compact';
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
		this.fs.write(
			this.destinationPath('Procfile.dev'),
			[this.fs.read(this.templatePath('Procfile.dev')), this.fs.read(this.destinationPath('Procfile.dev'), { defaults: '' })].join('\n').replace(/\n+/, '\n')
		);
	}
	writing() {
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.fs.copyTpl(this.templatePath('index.js.ejs'), this.destinationPath('index.js'), Object.assign({}, this, this.options));

		if (this.options.api) {
			this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
			this.fs.copy(this.templatePath('entities/foos/service.js'), this.destinationPath('entities/foos/service.js'));
		}
	}
	install() {
		this.npmInstall(
			compact([
				'babel-cli',
				'body-parser',
				'compression',
				'feathers',
				'feathers-errors',
				this.options.api && 'feathers-memory',
				this.options.api && 'feathers-rest',
				'helmet',
				'raven',
				'require-all',
			]),
			{ save: true }
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
