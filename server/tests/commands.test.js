import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { setup, disconnect, dropDatabase } from '../db';
import seed from './seed';

chai.use(chaiHttp);

let host;
let Category;
let user1Token;
let user2Token;

describe('commands', () => {
  beforeAll(async () => {
    const adminCredentials = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    const userCredentials = { email: 'test-user@user.com', password: 'test-user-password' };
    const { app, models } = await setup();
    await seed(models);
    host = app;
    Category = models.Category;
    const userLogin = await chai.request(host).post('/api/users/register').send(userCredentials);
    user2Token = userLogin.body.token;
    const adminLogin = await chai.request(host).post('/api/users/login').send(adminCredentials);
    user1Token = adminLogin.body.token;
  });

  test('create commands with valid categoryId', async () => {
    const commands = [{
      script: 'git test cheatsheet',
      description: 'create command description',
    }];
    const categories = await Category.find({});
    const categoryId = categories[0]._id;
    const response = await chai
      .request(host)
      .post('/api/commands')
      .send({ commands, categoryId })
      .query({ token: user1Token });
    const command = response.body.commands[0];
    expect(response.body.success).toBe(true);
    expect(command.script).toBe(command.script);
    expect(command.description).toBe(command.description);
    expect(command.categoryId).toBe(command.categoryId);
  });

  test('create commands with invalid categoryId', async () => {
    const commands = [{
      script: 'git test cheatsheet',
      description: 'create command description',
    }];
    const categoryId = 'bvjhkbfdkjzhbfkjh';
    const response = await chai
      .request(host)
      .post('/api/commands')
      .send({ commands, categoryId })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('category not found');
  });

  test('create commands with invalid categoryId', async () => {
    const commands = [{
      script: 'git test cheatsheet',
      description: 'create command description',
    }];
    const categoryId = mongoose.Types.ObjectId();
    const response = await chai
      .request(host)
      .post('/api/commands')
      .send({ commands, categoryId })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('category not found');
  });

  test('update existing command', async () => {
    const categories = await Category.find({});
    const command = {
      description: 'update command description',
    };
    const response = await chai.request(host)
      .put(`/api/commands/${categories[0].commands[0]}`)
      .send({ command })
      .query({ token: user1Token });
    expect(response.body.success).toBe(true);
    expect(response.body.command.description).toBe(command.description);
  });

  test('update existing command with unauthorized token', async () => {
    const categories = await Category.find({});
    const command = {
      description: 'update command description',
    };
    const response = await chai.request(host)
      .put(`/api/commands/${categories[0].commands[0]}`)
      .send({ command })
      .query({ token: user2Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('unauthorized');
  });

  test('update non-existing command', async () => {
    const command = {
      description: 'update command description',
    };
    const response = await chai.request(host)
      .put(`/api/commands/${mongoose.Types.ObjectId()}`)
      .send({ command })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('command not found');
  });

  test('update command with invalid id', async () => {
    const command = {
      description: 'update command description',
    };
    const response = await chai.request(host)
      .put('/api/commands/hjfhgjvbdkjhgvd')
      .send({ command })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('command not found');
  });

  test('toggle command privacy status', async () => {
    const categories = await Category.find({});
    const response = await chai.request(host)
      .put(`/api/commands/${categories[0].commands[0]}/toggle`)
      .query({ token: user1Token });
    expect(response.body.success).toBe(true);
  });

  test('toggle command privacy status with unauthorized token', async () => {
    const categories = await Category.find({});
    const response = await chai.request(host)
      .put(`/api/commands/${categories[0].commands[0]}/toggle`)
      .query({ token: user2Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('unauthorized');
  });

  test('delete command', async () => {
    const categories = await Category.find({});
    const commands = [{
      script: 'git test cheatsheet',
      description: 'create command description',
    }];
    const categoryId = categories[0]._id;
    const commandToBeDeleted = await chai
      .request(host)
      .post('/api/commands')
      .send({ commands, categoryId })
      .query({ token: user1Token });
    const response = await chai.request(host)
      .delete(`/api/commands/${commandToBeDeleted.body.commands[0]._id}`)
      .query({ token: user1Token });
    expect(response.body.success).toBe(true);
  });

  test('delete command with unauthorized token', async () => {
    const categories = await Category.find({});
    const commands = [{
      script: 'git test cheatsheet',
      description: 'create command description',
    }];
    const categoryId = categories[0]._id;
    const commandToBeDeleted = await chai
      .request(host)
      .post('/api/commands')
      .send({ commands, categoryId })
      .query({ token: user1Token });
    const response = await chai.request(host)
      .delete(`/api/commands/${commandToBeDeleted.body.commands[0]._id}`)
      .query({ token: user2Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('unauthorized');
  });

  test('move command from wrong current category to existing category', async () => {
    const categories = await Category.find({});
    const commandId = categories[0].commands[0]._id;
    const fromCategoryId = categories[1]._id;
    const toCategoryId = categories[0]._id;
    const response = await chai.request(host)
      .put(`/api/commands/${commandId}/move`)
      .send({ fromCategoryId, toCategoryId })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
  });

  test('move command from non-existing category to existing category', async () => {
    const categories = await Category.find({});
    const commandId = categories[0].commands[0]._id;
    const fromCategoryId = mongoose.Types.ObjectId();
    const toCategoryId = categories[1]._id;
    const response = await chai.request(host)
      .put(`/api/commands/${commandId}/move`)
      .send({ fromCategoryId, toCategoryId })
      .query({ token: user1Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('invalid fromCategoryId or toCategoryId');
  });

  test('move command from existing category to existing category', async () => {
    const categories = await Category.find({});
    const commandId = categories[0].commands[0]._id;
    const fromCategoryId = categories[0]._id;
    const toCategoryId = categories[1]._id;
    const response = await chai.request(host)
      .put(`/api/commands/${commandId}/move`)
      .send({ fromCategoryId, toCategoryId })
      .query({ token: user1Token });
    expect(response.body.success).toBe(true);
  });

  test('move command with invalid token', async () => {
    const categories = await Category.find({});
    const commandId = categories[0].commands[0]._id;
    const fromCategoryId = categories[0]._id;
    const toCategoryId = categories[1]._id;
    const response = await chai.request(host)
      .put(`/api/commands/${commandId}/move`)
      .send({ fromCategoryId, toCategoryId })
      .query({ token: user2Token });
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('unauthorized');
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
    host.close();
  });
});
