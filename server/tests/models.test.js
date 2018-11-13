import { connect, dropDatabase, disconnect } from '../db';

describe('models', () => {
  let models;
  let categoryId;
  beforeAll(done => connect().then((schema) => {
    models = schema;
    done();
  }));

  afterAll(done => dropDatabase().then(() => {
    disconnect();
    done();
  }));

  test('should create a category successfully', (done) => {
    const [title, description] = ['test title', 'test description'];
    models.Category.create({ title, description })
      .then((category) => {
        categoryId = category._id;
        expect(category.title).toBe(title);
        expect(category.description).toBe(description);
        done();
      });
  });

  test('should create a command successfully', (done) => {
    const [script, description] = ['test script', 'test description'];
    models.Command.create({ script, description, category: categoryId })
      .then((command) => {
        expect(command.script).toBe(script);
        expect(command.description).toBe(description);
        expect(command.category).toBe(categoryId);
        done();
      });
  });

  test('should create an admin successfully', (done) => {
    const [email, password] = ['test@test.com', 'test password'];
    models.Admin.create({ email, password })
      .then((admin) => {
        expect(admin.email).toBe(email);
        expect(admin.password).toBe(password);
        done();
      });
  });
});
