import chai from 'chai';
import chaiHttp from 'chai-http';
import { setup, disconnect, dropDatabase } from '../db';
import seed from './seed';

chai.use(chaiHttp);

let host;
const userCredentials = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };
// const userCredentials = { email: 'test-user@user.com', password: 'test-user-password' };

describe('categories', () => {
  beforeAll(async () => {
    const { app, models } = await setup();
    await seed(models);
    host = app;
  });

  test('register user', async () => {
    const credentials = { email: 'test-user@user.com', password: 'test-user-password' };
    const { body } = await chai.request(host).post('/api/users/register').send(credentials);
    expect(body.success).toBe(true);
  });

  test('login user with correct credentials', async () => {
    const { body } = await chai.request(host).post('/api/users/login').send(userCredentials);
    expect(body.success).toBe(true);
  });

  test('login user with wrong password', async () => {
    const { body } = await chai
      .request(host)
      .post('/api/users/login')
      .send({ ...userCredentials, password: 'wrongtestpassword' });
    expect(body.success).toBe(false);
    expect(body.error).toBe('wrong email or password');
  });

  test('login user with wrong email', async () => {
    const { body } = await chai
      .request(host)
      .post('/api/users/login')
      .send({ ...userCredentials, email: 'email@wrongemail.com' });
    expect(body.success).toBe(false);
    expect(body.error).toBe('wrong email or password');
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
    host.close();
  });
});
