import { IncomingMessage, ServerResponse } from 'http';
import { ICreateUser, IUser } from '../interface/user.interface.js';

export function createResponse(res: ServerResponse, status: number, el: IUser | IUser[]) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(el));
  res.end();
}

export function createErrResponse(res: ServerResponse, status = 500, message = 'something went wrong') {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message }));
  res.end();
  return;
}

export function getBody(req: IncomingMessage): Promise<ICreateUser | Partial<ICreateUser>> {
  return new Promise((res, rej) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          res(JSON.parse(body));
        } catch (error) {
          rej(error);
        }
      });
    } catch (error) {
      rej(error);
    }
  });
}
