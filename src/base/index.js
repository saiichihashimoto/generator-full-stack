import { Base } from 'yeoman-generator';

export class BaseGenerator extends Base {
	_spawn(command, args, opt) {
		return new Promise((resolve, reject) => {
			this.log(command, '"' + args.join('" "') + '"');
			const spawn = this.spawnCommand(command, args, Object.assign({ stdio: 'pipe' }, opt));
			let error = '';
			let value = '';

			spawn.stderr.on('data', (data) => {
				console.error(data.toString());
				error += data.toString();
			});

			spawn.stdout.on('data', (data) => {
				console.log(data.toString());
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
