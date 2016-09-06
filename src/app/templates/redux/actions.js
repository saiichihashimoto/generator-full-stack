import requireAll from 'require-all';

const actions = requireAll({
	dirname: __dirname,
	filter:  /^(.+)\.actions\.js$/,
});

export default Object.keys(actions).reduce((memo, filename) => Object.assign(memo, actions[filename]), {});
