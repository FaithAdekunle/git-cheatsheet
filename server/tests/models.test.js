import mongoose from 'mongoose';
import { connect, dropDatabase, disconnect } from '../db';

const userId = mongoose.Types.ObjectId();

describe('models', () => {
  let models;
  let categoryId;
  beforeAll(async () => {
    models = await connect();
  });


  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  test('should create a category successfully', async () => {
    const title = 'test title';
    const category = await models.Category.create({ title, userId });
    categoryId = category._id;
    expect(category.title).toBe(title);
  });

  test('should create a command successfully', async () => {
    const [script, description] = ['test script', 'test description'];
    const command = await models.Command.create({
      script,
      description,
      categoryId,
      userId,
    });
    expect(command.script).toBe(script);
    expect(command.description).toBe(description);
    expect(command.categoryId).toBe(categoryId);
  });

  test('should create a user successfully', async () => {
    const [email, password] = ['test@test.com', 'test password'];
    const user = await models.User.create({ email, password });
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
  });
});
