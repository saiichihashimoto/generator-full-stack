import { Base } from 'yeoman-generator';

export default class AppGenerator extends Base {
	initializing() {
		this.argument('name', { type: String, required: true });
	}
	writing() {
		// FIXME What goes in configuring/writing?
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
		this.fs.copy(this.templatePath('../../../.editorconfig'), this.destinationPath('.editorconfig'));
		this.fs.copy(this.templatePath('../../../.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('../../../.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('../../../.stylelintrc'), this.destinationPath('.stylelintrc'));
		this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
		this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
		this.fs.copy(this.templatePath('Procfile.dev'), this.destinationPath('Procfile.dev'));
		this.fs.copy(this.templatePath('assets/images/logo.png'), this.destinationPath('assets/images/logo.png'));
		this.fs.copy(this.templatePath('components/App/App.styles.web.css'), this.destinationPath('components/App/App.styles.web.css'));
		this.fs.copy(this.templatePath('components/App/App.web.js'), this.destinationPath('components/App/App.web.js'));
		this.fs.copy(this.templatePath('components/Foo/Foo.styles.web.css'), this.destinationPath('components/Foo/Foo.styles.web.css'));
		this.fs.copy(this.templatePath('components/Foo/Foo.web.js'), this.destinationPath('components/Foo/Foo.web.js'));
		this.fs.copy(this.templatePath('components/global.styles.web.css'), this.destinationPath('components/global.styles.web.css'));
		this.fs.copy(this.templatePath('components/routes.web.js'), this.destinationPath('components/routes.web.js'));
		this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
		this.fs.copy(this.templatePath('index.web.js'), this.destinationPath('index.web.js'));
		this.fs.copy(this.templatePath('redux/actions.js'), this.destinationPath('redux/actions.js'));
		this.fs.copy(this.templatePath('redux/createStore.js'), this.destinationPath('redux/createStore.js'));
		this.fs.copy(this.templatePath('redux/entities.actions.js'), this.destinationPath('redux/entities.actions.js'));
		this.fs.copy(this.templatePath('redux/entities.reducer.js'), this.destinationPath('redux/entities.reducer.js'));
		this.fs.copy(this.templatePath('report/index.js'), this.destinationPath('report/index.js'));
		this.fs.copy(this.templatePath('report/index.web.js'), this.destinationPath('report/index.web.js'));
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), Object.assign({}, this, this.options));
		this.fs.copyTpl(this.templatePath('webpack.config.babel.js'), this.destinationPath('webpack.config.babel.js'), Object.assign({}, this, this.options));
		this.fs.write(this.destinationPath('.env'), '');
		this.fs.write(this.destinationPath('.env.default'), '');
	}
	installing() {
		this.npmInstall(
			[
				'babel-cli',
				'babel-core',
				'babel-plugin-transform-class-properties',
				'babel-preset-es2015',
				'babel-preset-react',
				'body-parser',
				'compression',
				'classnames',
				'feathers',
				'feathers-errors',
				'feathers-rest',
				'helmet',
				'lodash.property',
				'lodash.wrap',
				'normalizr',
				'react',
				'react-dom',
				'react-redux',
				'react-router',
				'redux',
				'redux-actions',
				'redux-thunk',
				'reselect',
				'rollbar',
				'rollbar-browser',
			],
			{ save: true }
		);
		this.npmInstall(
			[
				'autoprefixer',
				'babel-eslint',
				'babel-loader',
				'babel-register',
				'bell-on-bundler-error-plugin',
				'chai',
				'chai-as-promised',
				'codecov.io',
				'css-loader',
				'cz-conventional-changelog',
				'eslint',
				'eslint-config-xo',
				'eslint-plugin-babel',
				'eslint-plugin-react',
				'extract-text-webpack-plugin',
				'favicons-webpack-plugin',
				'ghooks',
				'html-webpack-plugin',
				'html-webpack-template',
				'image-webpack-loader',
				'istanbul',
				'json-loader',
				'jsonlint',
				'last-release-github',
				'lodash.compact',
				'lodash.head',
				'lodash.tail',
				'mocha',
				'nock',
				'nodemon',
				'npm-run-all',
				'postcss-loader',
				'postcss-nested',
				'react-hot-loader@1.3.0',
				'semantic-release',
				'sinon',
				'sinon-chai',
				'sort-package-json',
				'style-loader',
				'stylefmt',
				'stylelint',
				'stylelint-config-standard',
				'url-loader',
				'validate-commit-msg',
				'webpack',
				'webpack-dev-server',
				'webpack-dotenv-plugin',
			],
			{ saveDev: true }
		);
	}
}
