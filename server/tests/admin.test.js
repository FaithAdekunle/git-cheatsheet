import chai from 'chai';
import chaiHttp from 'chai-http';
import { setup, disconnect, dropDatabase } from '../db';
import seed from './seed';

chai.use(chaiHttp);

let host;
const adminCredentials = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };

describe('categories', () => {
  beforeAll(async () => {
    const { app, models } = await setup();
    await seed(models);
    host = app;
  });

  test('login admin with correct credentials', async () => {
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    expect(body.success).toBe(true);
  });

  test('login admin with wrong password', async () => {
    const { body } = await chai
      .request(host)
      .get('/api/admin/login')
      .send({ ...adminCredentials, password: 'wrongtestpassword' });
    expect(body.success).toBe(false);
    expect(body.error).toBe('wrong email or password');
  });

  test('login admin with wrong email', async () => {
    const { body } = await chai
      .request(host)
      .get('/api/admin/login')
      .send({ ...adminCredentials, email: 'email@wrongemail.com' });
    expect(body.success).toBe(false);
    expect(body.error).toBe('wrong email or password');
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
    host.close();
  });
});
