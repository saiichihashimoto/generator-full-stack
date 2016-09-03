import { Base } from 'yeoman-generator';

export default class WebpackGenerator extends Base {
	initializing() {
		this.argument('name', { type: String, required: true });
	}
	configuring() {
		this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), { name: this.name });
	}
	installing() {
		this.npmInstall(
			[
				'autoprefixer',
				'babel-core',
				'babel-loader',
				'css-loader',
				'extract-text-webpack-plugin',
				'favicons-webpack-plugin',
				'html-webpack-plugin',
				'html-webpack-template',
				'image-webpack-loader',
				'json-loader',
				'lodash.compact',
				'lodash.head',
				'lodash.tail',
				'postcss-loader',
				'postcss-nested',
				'react',
				'react-hot-loader',
				'style-loader',
				'url-loader',
				'webpack',
				'webpack-dev-server',
			],
			{ saveDev: true }
		);
	}
}
