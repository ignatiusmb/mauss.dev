import { exec } from 'child_process';
import { readdir } from 'fs/promises';

for (const script of await readdir('./schema')) {
	if (!script.endsWith('.js')) continue;

	await new Promise((resolve, reject) => {
		exec(`node ./schema/${script}`, (err, stdout, stderr) => {
			if (stdout) process.stdout.write(stdout);
			if (stderr) process.stderr.write(stderr);
			err ? reject(err) : resolve(stdout);
		});
	});
}
