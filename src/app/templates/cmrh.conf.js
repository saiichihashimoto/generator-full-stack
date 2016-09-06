import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';

module.exports = {
	generateScopedName: '[name]---[local]',
	prepend:            [nested, autoprefixer],
	camelCase:          true,
	devMode:            !process.env.NODE_ENV,
};
