import mapKeys from 'lodash.mapkeys';

import { Base } from 'yeoman-generator';

export class BaseGenerator extends Base {
	_passableOptions(forGenerator) {
		return Object.assign(
			{},
			this.options,
			mapKeys(this.options, (value, key) => key.startsWith(forGenerator) ? key.replace(forGenerator, '') : key)
		);
	}
	_spawn(command, args, opt) {
		return new Promise((resolve, reject) => {
			const commandAsString = command + ' ' + args.map((arg) => arg.includes(' ') ? '"' + arg + '"' : arg).join(' ');
			this.log();
			this.log('$', commandAsString);
			this.log();

			this.spawnCommand(command, args, opt)
				.once('exit', (code, signal) => {
					if (code) {
						return reject(new Error('Spawned command failed with ' + code + ' ' + signal + ': ' + commandAsString));
					}
					resolve();
				});
		});
	}
}
