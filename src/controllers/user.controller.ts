import * as uuid from 'uuid';
import { USERS_DB } from '../db/users.js';
import { ICreateUser, IUpdateUser, IUser } from '../interface/user.interface.js';
import { isDataValid } from '../helpers/validation.js';
import { ResponseErr } from '../classes/err.js';

export class UserController {
  static async getUser(id = ''): Promise<IUser | IUser[]> {
    return new Promise((res, rej) => {
      if (!id) {
        res(USERS_DB);
      }
      if(!uuid.validate(id)){
        rej(new ResponseErr('id is not valid', 400))
      }
      const user = USERS_DB.find((el) => el.id === id);
      if (!user) {
        rej(new ResponseErr('User not found', 404));
      } else {
        res(user);
      }
    });
  }

  static async createUser(data: ICreateUser): Promise<IUser> {
    return new Promise((res, rej) => {
      const id = uuid.v4();
      const user = { ...data, id };
      if (isDataValid(user)) {
        USERS_DB.push(user);
        res(user);
      }
      rej(new ResponseErr('Invalid data', 400));
    });
  }

  static async updateUser(id: string, data: IUpdateUser): Promise<IUser> {
    return new Promise((res, rej) => {
      if(!uuid.validate(id)){
        rej(new ResponseErr('id is not valid', 400))
      }
      const user = USERS_DB.find((el) => el.id === id);
      const dataIsValid = isDataValid({ ...user, ...data });
      if(!user) {
        rej(new ResponseErr('User not found', 404))
      }
      if (user && dataIsValid) {
        const i = USERS_DB.findIndex((el) => el.id === id);
        USERS_DB[i] = { ...user, ...data };
        res(USERS_DB[i]);
      }
      rej(new ResponseErr('Invalid data', 400));
    });
  }

  static async deleteUser(id: string): Promise<string> {
    return new Promise((res, rej) => {
      if(!uuid.validate(id)){
        rej(new ResponseErr('id is not valid', 400))
      }
      const i = USERS_DB.findIndex((el) => el.id === id);
      if (i >= 0) {
        USERS_DB.splice(i, 1);
        res('removed');
      }
      rej(new ResponseErr('User not found', 404));
    });
  }
}
