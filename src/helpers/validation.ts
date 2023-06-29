import { Hobbies, ICreateUser, IUser, UserKeys } from '../interface/user.interface';

const userDataValidator: Partial<Record<UserKeys, (d: string | number | Hobbies) => boolean>> = {
  username: (d) => !!d && typeof d === 'string',
  age: (d) => typeof d === 'number',
  hobbies: (d) => Array.isArray(d) && d.every((v) => typeof v === 'string'),
};

export const isDataValid = (data: Partial<IUser>): boolean => {
  const dKeys = Object.keys(userDataValidator) as UserKeys[];
  return dKeys.every((k) => userDataValidator[k]?.(data[k] as string));
};
