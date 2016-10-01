import { Base } from 'yeoman-generator';

export class BaseGenerator extends Base {
	_spawn(command, args, opt) {
		return new Promise((resolve, reject) => {
			const spawn = this.spawnCommand(command, args, Object.assign({ stdio: 'pipe' }, opt));
			let error = '';
			let value = '';

			spawn.stderr.on('data', (data) => {
				error += data.toString();
			});

			spawn.stdout.on('data', (data) => {
				value += data.toString();
			});

			spawn.on('close', (code) => {
				if (code) {
					reject(new Error(error));
				} else {
					resolve(value);
				}
			});
		});
	}
}
