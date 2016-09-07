import compact from 'lodash.compact';
import { Base } from 'yeoman-generator';

export default class WebGenerator extends Base {
	constructor(...args) {
		super(...args);

		this.option('renderOn', { type: String, desc: 'When the documents should be rendered (build/serve/mount)' });
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
		this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		this.fs.copy(this.templatePath('redux/createStore.web.js'), this.destinationPath('redux/createStore.web.js'));
		this.fs.copy(this.templatePath('redux/entities.actions.js'), this.destinationPath('redux/entities.actions.js'));
		this.fs.copy(this.templatePath('redux/entities.reducer.js'), this.destinationPath('redux/entities.reducer.js'));
		this.fs.copy(this.templatePath('report/index.web.js'), this.destinationPath('report/index.web.js'));
		this.fs.copyTpl(this.templatePath('webpack.config.babel.js.ejs'), this.destinationPath('webpack.config.babel.js'), Object.assign({}, this, this.options));
		this.fs.write(this.destinationPath('.env.default'), '');

		switch (this.options.renderOn) {
			case 'build':
			case 'mount':
				this.fs.copy(this.templatePath('api/index.js'), this.destinationPath('api/index.js'));
				this.fs.copy(this.templatePath('web/index.web.ejs'), this.destinationPath('web/index.ejs'));
				break;
			case 'serve':
				this.fs.copy(this.templatePath('web/index.ejs'), this.destinationPath('web/index.ejs'));
				this.fs.copy(this.templatePath('web/render.middleware.js'), this.destinationPath('web/render.middleware.js'));
				break;
			default:
				break;
		}
	}
	installing() {
		let whereToSave;
		switch (this.options.renderOn) {
			case 'build':
			case 'mount':
				whereToSave = { saveDev: true };
				break;
			case 'serve':
				whereToSave = { save: true };
				break;
			default:
				break;
		}
		if (whereToSave) {
			this.npmInstall(
				[
					'autoprefixer',
					'babel-loader',
					'babel-register',
					'bell-on-bundler-error-plugin',
					'classnames',
					'css-loader',
					'css-modules-require-hook',
					'ejs-compiled-loader',
					'extract-text-webpack-plugin',
					'favicons-webpack-plugin',
					'html-webpack-plugin',
					'image-webpack-loader',
					'json-loader',
					'lodash.compact',
					'lodash.head',
					'lodash.isarray',
					'lodash.mapvalues',
					'lodash.tail',
					'normalizr',
					'pluralize',
					'postcss-loader',
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
					'style-loader',
					'url-loader',
					'webpack',
					'webpack-dotenv-plugin',
				],
				whereToSave
			);
		}

		if (this.options.renderOn === 'serve') {
			this.npmInstall(
				[
					'clean-webpack-plugin',
					'ejs',
					'feathers-errors',
					'write-file-webpack-plugin',
				],
				{ save: true }
			);
		}
		this.npmInstall(
			compact([
				'feathers',
				'feathers-rest',
				'raven-js',
				'react-hot-loader@1.3.0',
				(this.options.renderOn === 'build' || this.options.renderOn === 'mount') && 'react-router-to-array',
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
				'webpack-dev-server',
			]),
			{ saveDev: true }
		);
	}
}
