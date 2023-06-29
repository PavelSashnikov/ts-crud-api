export interface IUser extends ICreateUser {
  // TODO: add uuid type
  [UserKeys.id]: string;
}

export type Hobbies = string[];

export interface ICreateUser {
  [UserKeys.id]: string;
  [UserKeys.name]: string;
  [UserKeys.age]: number;
  [UserKeys.hobbies]: Hobbies;
}

export type IUpdateUser = Partial<ICreateUser>
export enum UserKeys {
  id = 'id',
  name = 'username',
  age = 'age',
  hobbies = 'hobbies',
}
