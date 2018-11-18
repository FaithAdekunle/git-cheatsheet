import { connect, dropDatabase, disconnect } from '../db';

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
    const [title, description] = ['test title', 'test description'];
    const category = await models.Category.create({ title, description });
    categoryId = category._id;
    expect(category.title).toBe(title);
    expect(category.description).toBe(description);
  });

  test('should create a command successfully', async () => {
    const [script, description] = ['test script', 'test description'];
    const command = await models.Command.create({ script, description, categoryId });
    expect(command.script).toBe(script);
    expect(command.description).toBe(description);
    expect(command.categoryId).toBe(categoryId);
  });

  test('should create an admin successfully', async () => {
    const [email, password] = ['test@test.com', 'test password'];
    const admin = await models.Admin.create({ email, password });
    expect(admin.email).toBe(email);
    expect(admin.password).toBe(password);
  });
});
