import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import compact from 'lodash.compact';
import head from 'lodash.head';
import nested from 'postcss-nested';
import path from 'path';
import tail from 'lodash.tail';
import webpack from 'webpack';

const cssLoaders = ['style', 'css?-autoprefixer&importLoaders=1&camelCase&modules&localIdentName=[name]---[local]', 'postcss'];

export default {
	entry: {
		index: '.',
	},
	output: {
		path:       'dist/web',
		filename:   '[name].[hash].js',
		publicPath: '/',
	},
	module: {
		loaders: compact([
			process.env.NODE_ENV ?
				{ exclude: /node_modules/, test: /\.(css)$/, loader: ExtractTextPlugin.extract(head(cssLoaders), tail(cssLoaders)) } :
				{ exclude: /node_modules/, test: /\.(css)$/, loaders: cssLoaders },
			{ exclude: /node_modules/, test: /\.(eot|ttf|(woff(2)?(\?v=\d\.\d\.\d)?))$/, loader: 'url?name=fonts/[name].[hash].[ext]&limit=10000' },
			{ exclude: /node_modules/, test: /\.(gif|jpe?g|svg|png)$/i, loaders: ['url?name=images/[name].[hash].[ext]&limit=1000', 'image-webpack'] },
			!process.env.NODE_ENV && { include: path.join(__dirname, 'components'), test: /\.(js)$/, loader: 'react-hot' },
			{ exclude: /node_modules/, test: /\.(js)$/, loader: 'babel?cacheDirectory' },
			{ exclude: /node_modules/, test: /\.(json)$/, loader: 'json' },
		]),
	},
	resolve: {
		extensions: [
			'',
			'.webpack.json', '.webpack.js', '.webpack.css',
			'.web.json', '.web.js', '.web.css',
			'.json', '.js', '.css',
		],
	},
	devtool:   'cheap-module-source-map',
	devServer: {
		port:               process.env.PORT,
		historyApiFallback: {
			index: '/',
		},
		stats: {
			colors: true,
		},
	},
	node: {
		console: true,
		dns:     'empty',
		fs:      'empty',
		net:     'empty',
		tls:     'empty',
	},
	plugins: compact([
		new webpack.EnvironmentPlugin([
			'NODE_ENV',
			'SENTRY_DSN_CLIENT',
			'npm_package_gitHead',
		]),
		new BellOnBundlerErrorPlugin(),
		!process.env.NODE_ENV && new require('webpack-dotenv-plugin')(),
		process.env.NODE_ENV && new ExtractTextPlugin('[name].[hash].css'),
		new FaviconsWebpackPlugin({ logo: './assets/images/logo.png', title: '<%= name %>', prefix: 'favicons-[hash]/' }),
		new HtmlWebpackPlugin({
			googleAnalytics: process.env.GOOGLE_ANALYTICS_ID && {
				trackingId:     process.env.GOOGLE_ANALYTICS_ID,
				pageViewOnLoad: true,
			},
			title:      '<%= name %>',
			inject:     false,
			template:   require('html-webpack-template'),
			appMountId: 'mount',
			mobile:     true,
		}),
	]),
	postcss: () => [nested, autoprefixer],
};
