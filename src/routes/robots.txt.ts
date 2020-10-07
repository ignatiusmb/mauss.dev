import type { Request, Response } from 'express';

const directive = `
User-agent: *
Disallow: /api
`;

export function get({ hostname }: Request, res: Response) {
	console.log(hostname);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end(hostname === 'mauss.dev' ? directive : '');
}
