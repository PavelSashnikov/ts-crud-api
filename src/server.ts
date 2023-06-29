import { createServer } from 'http';
import { ENDPOINT, ENDPOINT_REG } from './helpers/constants.js';
import { createErrResponse, createResponse, getBody } from './helpers/response.js';
import { Method } from './interface/common.interface.js';
import { UserController } from './controllers/user.controller.js';
import { ResponseErr } from './classes/err.js';
import { ICreateUser } from './interface/user.interface.js';

export const serv = createServer(async (req, res) => {
  if (req.url?.startsWith(ENDPOINT)) {
    const providedId = req.url?.replace(ENDPOINT_REG, '');
    try {
      switch (req.method) {
        case Method.get:
          const users = await UserController.getUser(providedId);
          createResponse(res, 200, users);
          break;
        case Method.post:
          const createBody = await getBody(req) as ICreateUser;
          const newUser = await UserController.createUser(createBody);
          createResponse(res, 201, newUser)
          break;
        case Method.put:
          const updateBody = await getBody(req);
          const changedUser = await UserController.updateUser(providedId, updateBody);
          createResponse(res, 200, changedUser)
          break;
        case Method.del:
          await UserController.deleteUser(providedId);
          createResponse(res, 204, 'remove. succeeded')
          break;
        default:
          createErrResponse(res, 404, 'unknown method');
          break;
      }
    } catch (err) {
      const error = err as ResponseErr;
      createErrResponse(res, error?.status, error?.message);
    }
  } else {
    createErrResponse(res, 404, 'unknown endpoint');
  }
});
