import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { setup, disconnect, dropDatabase } from '../db';
import seed, { categories } from './seed';

chai.use(chaiHttp);

let host;
let user1Token;
let user2Token;

describe('categories', () => {
  beforeAll(async () => {
    const adminCredentials = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    const userCredentials = { email: 'test-user@user.com', password: 'test-user-password' };
    const { app, models } = await setup();
    await seed(models);
    host = app;
    const userLogin = await chai.request(host).post('/api/users/register').send(userCredentials);
    user2Token = userLogin.body.token;
    const adminLogin = await chai.request(host).post('/api/users/login').send(adminCredentials);
    user1Token = adminLogin.body.token;
  });

  test('get categories', async () => {
    const response = await chai.request(host).get('/api/categories');
    expect(response.body.success).toBe(true);
    expect(response.body.categories.length).toBe(categories.length);
  });

  test('get categories as logged in user', async () => {
    const response = await chai.request(host).get('/api/categories').query({ token: user1Token });
    expect(response.body.success).toBe(true);
  });

  test('get categories with bad token', async () => {
    const response = await chai.request(host).get('/api/categories').query({ token: 'bad token' });
    expect(response.body.error).toBe('bad token');
  });

  test('get categories with non user token', async () => {
    const response = await chai
      .request(host)
      .get('/api/categories')
      .query({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhZGVtYWlsIiwiaWQiOiJiYWRpZCIsImlhdCI6MTU0MjU0NDE1MH0.NlwrRevB5vU0D4TfVVwSuR-cXBg-0scTgraTujhXewo' });
    expect(response.body.error).toBe('unauthenticated token');
  });

  test('create category with authorized token', async () => {
    const category = {
      title: 'testing post category title',
    };
    const response = await chai
      .request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: user1Token });
    expect(response.body.success).toBe(true);
    expect(response.body.category.title).toBe(category.title);
  });

  test('create category with invalid token', async () => {
    const category = {
      title: 'testing post category title',
    };
    const response = await chai
      .request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: 'invalid-token' });
    expect(response.body.success).toBe(false);
    expect(response.body.unauthorized).toBe(true);
  });

  test('create category with non-existing token', async () => {
    const category = {
      title: 'testing post category title',
    };
    const response = await chai
      .request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhZGVtYWlsIiwiaWQiOiJiYWRpZCIsImlhdCI6MTU0MjU0NDE1MH0.NlwrRevB5vU0D4TfVVwSuR-cXBg-0scTgraTujhXewo' });
    expect(response.body.success).toBe(false);
    expect(response.body.unauthorized).toBe(true);
  });

  test('delete existing category', async () => {
    const category = {
      title: 'testing delete category title',
    };
    const createResponse = await chai
      .request(host)
      .post('/api/categories')
      .query({ token: user1Token })
      .send({ category });
    const deleteResponse = await chai
      .request(host)
      .delete(`/api/categories/${createResponse.body.category._id}`)
      .query({ token: user1Token });
    expect(deleteResponse.body.success).toBe(true);
  });

  test('delete existing category with unauthorized token', async () => {
    const category = {
      title: 'testing delete category title',
    };
    const createResponse = await chai
      .request(host)
      .post('/api/categories')
      .query({ token: user1Token })
      .send({ category });
    const deleteResponse = await chai
      .request(host)
      .delete(`/api/categories/${createResponse.body.category._id}`)
      .query({ token: user2Token });
    expect(deleteResponse.body.success).toBe(false);
    expect(deleteResponse.body.error).toBe('unauthorized');
  });

  test('delete non-existing category', async () => {
    const deleteResponse = await chai
      .request(host)
      .delete(`/api/categories/${mongoose.Types.ObjectId()}`)
      .query({ token: user1Token });
    expect(deleteResponse.body.success).toBe(false);
    expect(deleteResponse.body.error).toBe('category not found');
  });

  test('update existing category', async () => {
    const category = {
      title: 'testing update category title',
    };
    const categoryUpdate = {
      title: 'updated category title',
    };
    const createResponse = await chai.request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: user1Token });
    const updateResponse = await chai
      .request(host)
      .put(`/api/categories/${createResponse.body.category._id}`)
      .send({ category: categoryUpdate })
      .query({ token: user1Token });
    expect(updateResponse.body.success).toBe(true);
  });

  test('update existing category with unauthorized token', async () => {
    const category = {
      title: 'testing update category title',
    };
    const categoryUpdate = {
      title: 'updated category title',
    };
    const createResponse = await chai.request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: user1Token });
    const updateResponse = await chai
      .request(host)
      .put(`/api/categories/${createResponse.body.category._id}`)
      .send({ category: categoryUpdate })
      .query({ token: user2Token });
    expect(updateResponse.body.success).toBe(false);
    expect(updateResponse.body.error).toBe('unauthorized');
  });

  test('update non-existing category', async () => {
    const category = {
      title: 'updated category title',
    };
    const updateResponse = await chai
      .request(host)
      .put(`/api/categories/${mongoose.Types.ObjectId()}`)
      .send({ category })
      .query({ token: user1Token });
    expect(updateResponse.body.success).toBe(false);
    expect(updateResponse.body.error).toBe('category not found');
  });

  test('toggle category privacy status', async () => {
    const category = {
      title: 'testing toggle category title',
    };
    const createResponse = await chai.request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: user1Token });
    const toggleResponse = await chai
      .request(host)
      .put(`/api/categories/${createResponse.body.category._id}/toggle`)
      .query({ token: user1Token });
    expect(toggleResponse.body.success).toBe(true);
  });

  test('toggle category privacy status with unauthorized token', async () => {
    const category = {
      title: 'testing toggle category title',
    };
    const createResponse = await chai.request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: user1Token });
    const toggleResponse = await chai
      .request(host)
      .put(`/api/categories/${createResponse.body.category._id}/toggle`)
      .query({ token: user2Token });
    expect(toggleResponse.body.success).toBe(false);
    expect(toggleResponse.body.error).toBe('unauthorized');
  });

  test('toggle non existing category privacy status', async () => {
    const toggleResponse = await chai
      .request(host)
      .put(`/api/categories/${mongoose.Types.ObjectId()}/toggle`)
      .query({ token: user1Token });
    expect(toggleResponse.body.success).toBe(false);
    expect(toggleResponse.body.error).toBe('category not found');
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
    host.close();
  });
});
