import request from 'supertest';
import 'dotenv/config';
import { ENDPOINT } from '../src/helpers/constants';
import { validate } from 'uuid';

const port = process.env.PORT;
const server = `http://localhost:${port}`;

interface TestUser {
  id?: string;
  username: string;
  age: string | number;
  hobbies: string[];
}

describe('simple flow', () => {
  const userData = {
    id: '',
    username: 'Adam',
    age: 12,
    hobbies: ['music', 'guitar'],
  };
  afterAll(() => {
    jest.resetModules();
  });
  test('should get DB', async () => {
    const response = await request(server).get(ENDPOINT);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should create a new user in DB', async () => {
    const response = await request(server).post(ENDPOINT).send(userData);
    userData.id = response.body.id;
    expect(response.body).toEqual(userData);
  });
  test('should get created user from DB', async () => {
    const response = await request(server).get(`${ENDPOINT}/${userData.id}`);
    expect(response.body).toEqual(userData);
  });
  test('should update user', async () => {
    const newName = 'Phill';
    const response = await request(server).put(`${ENDPOINT}/${userData.id}`).send({ name: newName });
    expect(response.body).toEqual({ ...userData, name: newName });
  });
  test('should delete user', async () => {
    await request(server).delete(`${ENDPOINT}/${userData.id}`);
    await request(server).get(`${ENDPOINT}/${userData.id}`).expect(404);
  });
});

describe('API user err', () => {
  const person: TestUser = {
    username: 'Vi',
    age: 23,
    hobbies: ['snowboadring'],
  };
  beforeEach(() => {
    person.username = 'Vi';
    person.age = 23;
    person.hobbies = ['snowboadring'];
  });

  test('should be err (invalid age)', async () => {
    const response = await request(server).post(ENDPOINT).send(person).expect(201);

    person.age = '77';
    const id = response.body.id;
    await request(server).put(`${ENDPOINT}/${id}`).send(person).expect(400);
    await request(server).delete(`${ENDPOINT}/${id}`).expect(204);
  });

  test('should be err (invalid id)', async () => {
    const response = await request(server).get(`${ENDPOINT}/1234`).send(person);
    expect(response.statusCode).toBe(400);
  });
});

describe('API random flow', () => {
  const person: TestUser = {
    username: 'Vi',
    age: 23,
    hobbies: ['snowboadring'],
  };
  beforeEach(() => {
    person.username = 'Vi';
    person.age = 23;
    person.hobbies = ['snowboadring'];
  });

  test('should create person and get new one', async () => {
    const response = await request(server).post(ENDPOINT).send(person).expect(201);

    person.id = response.body.id;

    expect(validate(response.body.id)).toBeTruthy();
    expect(response.body).toEqual(person);

    const newItem = await request(server).get(`${ENDPOINT}/${person.id}`);
    expect(newItem.body).toEqual(person);
  });

  test('should person remove', async () => {
    await request(server).delete(`${ENDPOINT}/${person.id}`).expect(204);

    await request(server).get(`${ENDPOINT}${person.id}`).expect(404);
  });
});
