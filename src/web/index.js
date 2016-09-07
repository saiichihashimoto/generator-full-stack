import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class WebGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.option('dynamic', { type: Boolean, desc: 'If the content will be dynamically rendered' });
	}
	prompting() {
		return Promise.resolve()
			.then(() => this.prompt(compact([
				(this.options.dynamic === undefined) && {
					message: 'Will the content be dynamically rendered?',
					name:    'dynamic',
					type:    'confirm',
					default: true,
				},
			])))
			.then((answers) => {
				if (answers.dynamic !== undefined) {
					this.options.dynamic = answers.dynamic;
				}
			});
	}
	writing() {
		this.fs.copy(this.templatePath('../../../.stylelintrc'), this.destinationPath('.stylelintrc'));
		this.fs.copy(this.templatePath('api/index.web.js'), this.destinationPath('api/index.web.js'));
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
		this.fs.copy(this.templatePath('redux/createStore.web.js'), this.destinationPath('redux/createStore.web.js'));
		this.fs.copy(this.templatePath('redux/entities.actions.js'), this.destinationPath('redux/entities.actions.js'));
		this.fs.copy(this.templatePath('redux/entities.reducer.js'), this.destinationPath('redux/entities.reducer.js'));
		this.fs.copy(this.templatePath('report/index.web.js'), this.destinationPath('report/index.web.js'));
		this.fs.copyTpl(this.templatePath('Procfile.dev.ejs'), this.destinationPath('Procfile.dev'), Object.assign({}, this, this.options));
		this.fs.copyTpl(this.templatePath('webpack.config.babel.js.ejs'), this.destinationPath('webpack.config.babel.js'), Object.assign({}, this, this.options));
		this.fs.write(this.destinationPath('.env.default'), '');

		if (this.options.dynamic) {
			// TODO this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		} else {
			this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
		}
	}
	installing() {
		this.npmInstall(
			compact([
				'babel-loader',
				'babel-register',
				'bell-on-bundler-error-plugin',
				'css-loader',
				'extract-text-webpack-plugin',
				'favicons-webpack-plugin',
				'feathers',
				'feathers-rest',
				'html-webpack-plugin',
				'html-webpack-template',
				'image-webpack-loader',
				'json-loader',
				'lodash.compact',
				'lodash.head',
				'lodash.tail',
				'postcss-loader',
				'raven-js',
				'react-hot-loader@1.3.0',
				!this.options.dynamic && 'react-router-to-array',
				'style-loader',
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
				'url-loader',
				'webpack',
				'webpack-dev-server',
				'webpack-dotenv-plugin',
			]),
			{ saveDev: true }
		);
		this.npmInstall(
			[
				'autoprefixer',
				'classnames',
				'css-modules-require-hook',
				'lodash.isarray',
				'lodash.mapvalues',
				'normalizr',
				'pluralize',
				'postcss-nested',
				'react',
				'react-dom',
				'react-redux',
				'react-router',
				'redux',
				'redux-actions',
				'redux-thunk',
				'require-all',
				'reselect',
			],
			this.options.dynamic ? { save: true } : { saveDev: true }
		);
	}
}
