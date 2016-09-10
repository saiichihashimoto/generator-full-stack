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
						{ name: 'Don\'t worry about it', value: null },
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
		this.fs.copy(this.templatePath('components/App/App.js'), this.destinationPath('components/App/App.js'));
		this.fs.copy(this.templatePath('components/App/App.styles.css'), this.destinationPath('components/App/App.styles.css'));
		this.fs.copy(this.templatePath('components/Foo/Foo.js'), this.destinationPath('components/Foo/Foo.js'));
		this.fs.copy(this.templatePath('components/Foo/Foo.styles.css'), this.destinationPath('components/Foo/Foo.styles.css'));
		this.fs.copy(this.templatePath('components/global.styles.css'), this.destinationPath('components/global.styles.css'));
		this.fs.copy(this.templatePath('components/routes.js'), this.destinationPath('components/routes.js'));
		this.fs.copy(this.templatePath('entities/foos/schema.normalizr.js'), this.destinationPath('entities/foos/schema.normalizr.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.js'), this.destinationPath('entities/schemas.normalizr.js'));
		this.fs.copy(this.templatePath('entities/schemas.normalizr.web.js'), this.destinationPath('entities/schemas.normalizr.web.js'));
		this.fs.copy(this.templatePath('index.web.js'), this.destinationPath('index.web.js'));
		this.fs.copy(this.templatePath('redux/actions.js'), this.destinationPath('redux/actions.js'));
		this.fs.copy(this.templatePath('redux/actions.web.js'), this.destinationPath('redux/actions.web.js'));
		this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		this.fs.copy(this.templatePath('redux/createStore.web.js'), this.destinationPath('redux/createStore.web.js'));
		this.fs.copy(this.templatePath('redux/entities.reducer.js'), this.destinationPath('redux/entities.reducer.js'));
		this.fs.write(this.destinationPath('.env.default'), '');
		this.npmInstall(
			[
				'autoprefixer',
				'classnames',
				'feathers-errors',
				'lodash.compact',
				'lodash.mapvalues',
				'lodash.omit',
				'normalizr',
				'postcss-nested',
				'react',
				'react-dom',
				'react-helmet',
				'react-redux',
				'react-router',
				'redux',
				'redux-actions',
				'redux-thunk',
				'require-all',
				'reselect',
			],
			(this.options.render === 'server') ? { save: true } : { saveDev: true }
		);

		this.fs.copy(this.templatePath('report/index.web.js'), this.destinationPath('report/index.web.js'));
		this.npmInstall(
			[
				'raven-js',
			],
			{ saveDev: true }
		);

		this.fs.copyTpl(this.templatePath('redux/entities.actions.js.ejs'), this.destinationPath('redux/entities.actions.js'), Object.assign({}, this, this.options));
		this.npmInstall(
			[
				'pluralize',
			],
			(this.options.render === 'server') ? { save: true } : { saveDev: true }
		);
		if (this.options.api) {
			this.npmInstall(
				[
					'lodash.isarray',
				],
				(this.options.render === 'server') ? { save: true } : { saveDev: true }
			);
		}

		this.fs.copyTpl(this.templatePath('webpack.config.babel.js.ejs'), this.destinationPath('webpack.config.babel.js'), Object.assign({}, this, this.options));
		this.npmInstall(
			[
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
		this.npmInstall(
			[
				'react-hot-loader@1.3.0',
			],
			{ saveDev: true }
		);
	}
	writing() {
		this.fs.extendJSON(this.destinationPath('.eslintrc'), this.fs.readJSON(this.templatePath('.eslintrc')));
		this.npmInstall(
			[
				'eslint-plugin-react',
			],
			{ saveDev: true }
		);

		this.fs.extendJSON(this.destinationPath('package.json'), this.fs.readJSON(this.templatePath('package.json')));
		this.npmInstall(
			[
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
			],
			{ saveDev: true }
		);

		this.fs.write(
			this.destinationPath('.editorconfig'),
			[this.fs.read(this.destinationPath('.editorconfig')), this.fs.read(this.templatePath('.editorconfig'))].join('\n\n').replace(/\n\n+/, '\n\n')
		);

		this.fs.write(
			this.destinationPath('Procfile.dev'),
			[this.fs.read(this.destinationPath('Procfile.dev')), this.fs.read(this.templatePath('Procfile.dev'))].join('\n').replace(/\n+/, '\n')
		);
		this.npmInstall(
			[
				'webpack-dev-server',
			],
			{ saveDev: true }
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
	}
	_prompt(prompts) {
		return this.prompt(prompts).then((answers) => {
			this.options = Object.assign({}, this.options, answers);
		});
	}
}
