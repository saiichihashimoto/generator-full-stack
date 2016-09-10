import { Base } from 'yeoman-generator';

export default class WebGenerator extends Base {
	initializing() {
		if (this.options.render === 'server') {
			this.options = Object.assign({}, this.options, { deploy: null });
		}
	}
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
					default: 'gh-pages',
					choices: [
						{ name: 'Github Pages', value: 'gh-pages' },
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
		this.fs.copy(this.templatePath('../../../.stylelintrc'), this.destinationPath('.stylelintrc'));
		this.fs.copy(this.templatePath('cmrh.conf.js'), this.destinationPath('cmrh.conf.js'));
		this.fs.copyTpl(this.templatePath('webpack.config.babel.js.ejs'), this.destinationPath('webpack.config.babel.js'), Object.assign({}, this, this.options));
		this.fs.write(this.destinationPath('.env.default'), '');

		this.npmInstall(
			[
				'react-hot-loader@1.3.0',
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
			],
			{ saveDev: true }
		);

		this.npmInstall(
			[
				'autoprefixer',
				'babel-loader',
				'babel-register',
				'bell-on-bundler-error-plugin',
				'css-loader',
				'css-modules-require-hook',
				'ejs-compiled-loader',
				'extract-text-webpack-plugin',
				'favicons-webpack-plugin',
				'html-webpack-plugin',
				'image-webpack-loader',
				'json-loader',
				'lodash.head',
				'lodash.tail',
				'postcss-loader',
				'postcss-nested',
				'style-loader',
				'url-loader',
				'webpack',
				'webpack-dotenv-plugin',
			],
			(this.options.render === 'server') ? { save: true } : { saveDev: true }
		);

		if (this.options.render === 'server') {
			this.npmInstall(
				[
					'clean-webpack-plugin',
					'write-file-webpack-plugin',
				],
				{ save: true }
			);
		} else {
			this.npmInstall(
				[
					'react-router-to-array',
				],
				{ save: true }
			);
		}
	}
	writing() {
		this.fs.copy(this.templatePath('components/App/App.styles.css'), this.destinationPath('components/App/App.styles.css'));
		this.fs.copy(this.templatePath('components/Foo/Foo.js'), this.destinationPath('components/Foo/Foo.js'));
		this.fs.copy(this.templatePath('components/Foo/Foo.styles.css'), this.destinationPath('components/Foo/Foo.styles.css'));
		this.fs.copy(this.templatePath('components/global.styles.css'), this.destinationPath('components/global.styles.css'));
		this.fs.copy(this.templatePath('report/index.web.js'), this.destinationPath('report/index.web.js'));
		this.fs.copyTpl(this.templatePath('components/App/App.js.ejs'), this.destinationPath('components/App/App.js'), Object.assign({}, this, this.options));
		this.fs.copyTpl(this.templatePath('components/routes.js.ejs'), this.destinationPath('components/routes.js'), Object.assign({}, this, this.options));
		this.fs.copyTpl(this.templatePath('index.web.js.ejs'), this.destinationPath('index.web.js'), Object.assign({}, this, this.options));
		this.fs.extendJSON(this.destinationPath('.eslintrc'), this.fs.readJSON(this.templatePath('.eslintrc')));
		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.fs.write(
			this.destinationPath('.editorconfig'),
			[this.fs.read(this.destinationPath('.editorconfig')), this.fs.read(this.templatePath('.editorconfig'))].join('\n\n').replace(/\n{3,}/, '\n\n')
		);
		this.fs.write(
			this.destinationPath('Procfile.dev'),
			[this.fs.read(this.destinationPath('Procfile.dev')), this.fs.read(this.templatePath('Procfile.dev'))].join('\n').replace(/\n{2,}/, '\n')
		);

		switch (this.options.render) {
			case 'server':
				this.fs.copy(this.templatePath('web/index.ejs'), this.destinationPath('web/index.ejs'));
				this.fs.copy(this.templatePath('web/render.middleware.js'), this.destinationPath('web/render.middleware.js'));
				break;
			case 'web':
			default:
				this.fs.copy(this.templatePath('web/index.web.ejs'), this.destinationPath('web/index.ejs'));
				break;
		}

		this.npmInstall(
			[
				'eslint-plugin-react',
				'raven-js',
				'webpack-dev-server',
			],
			{ saveDev: true }
		);

		this.npmInstall(
			[
				'classnames',
				'feathers-errors',
				'lodash.compact',
				'react',
				'react-dom',
				'react-helmet',
				'react-router',
			],
			(this.options.render === 'server') ? { save: true } : { saveDev: true }
		);
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
