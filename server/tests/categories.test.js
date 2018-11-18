import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { setup, disconnect, dropDatabase } from '../db';
import seed, { categories } from './seed';

chai.use(chaiHttp);

let host;
const adminCredentials = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };

describe('categories', () => {
  beforeAll(async () => {
    const { app, models } = await setup();
    await seed(models);
    host = app;
  });

  test('get categories', async () => {
    const response = await chai.request(host).get('/api/categories');
    expect(response.body.success).toBe(true);
    expect(response.body.categories.length).toBe(categories.length);
  });

  test('create category with authorized token', async () => {
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    const category = {
      title: 'testing post category title',
      description: 'testing post category description',
    };
    const response = await chai
      .request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: body.token });
    expect(response.body.success).toBe(true);
    expect(response.body.category.title).toBe(category.title);
    expect(response.body.category.description).toBe(category.description);
  });

  test('create category with invalid token', async () => {
    const category = {
      title: 'testing post category title',
      description: 'testing post category description',
    };
    const response = await chai
      .request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: 'invalid-token' });
    expect(response.body.success).toBe(false);
    expect(response.body.unauthorized).toBe(true);
  });

  test('create category with unauthorized token', async () => {
    const category = {
      title: 'testing post category title',
      description: 'testing post category description',
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
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    const category = {
      title: 'testing delete category title',
      description: 'testing delete category description',
    };
    const createResponse = await chai
      .request(host)
      .post('/api/categories')
      .query({ token: body.token })
      .send({ category });
    const deleteResponse = await chai
      .request(host)
      .delete(`/api/categories/${createResponse.body.category._id}`)
      .query({ token: body.token });
    expect(deleteResponse.body.success).toBe(true);
  });

  test('delete non-existing category', async () => {
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    const deleteResponse = await chai
      .request(host)
      .delete(`/api/categories/${mongoose.Types.ObjectId()}`)
      .query({ token: body.token });
    expect(deleteResponse.body.success).toBe(false);
    expect(deleteResponse.body.error).toBe('category not found');
  });

  test('update existing category', async () => {
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    const category = {
      title: 'testing update category title',
      description: 'testing update category description',
    };
    const categoryUpdate = {
      description: 'updated testing update category description',
    };
    const createResponse = await chai.request(host)
      .post('/api/categories')
      .send({ category })
      .query({ token: body.token });
    const updateResponse = await chai
      .request(host)
      .put(`/api/categories/${createResponse.body.category._id}`)
      .send({ category: categoryUpdate })
      .query({ token: body.token });
    expect(updateResponse.body.success).toBe(true);
  });

  test('update non-existing category', async () => {
    const { body } = await chai.request(host).get('/api/admin/login').send(adminCredentials);
    const category = {
      description: 'updated testing update category description',
    };
    const updateResponse = await chai
      .request(host)
      .put(`/api/categories/${mongoose.Types.ObjectId()}`)
      .send({ category })
      .query({ token: body.token });
    expect(updateResponse.body.success).toBe(false);
    expect(updateResponse.body.error).toBe('category not found');
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
    host.close();
  });
});
