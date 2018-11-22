import bcrypt from 'bcrypt';
import categories from './categories';
import { connect, disconnect, dropDatabase } from '../db';


export const seedCommands = async (
  Category,
  Command,
  seededCategories,
  disconnectAfter = true,
  index = 0,
) => {
  const seededCategory = seededCategories[index];
  const nextCategory = categories.find(category => category.title === seededCategory.title);
  const commands = await Command
    .create(nextCategory.commands.map(command => ({
      ...command,
      categoryId: seededCategory._id,
      userId: seededCategory.userId,
    })));
  await Category.findOneAndUpdate(
    { _id: seededCategory._id },
    { commands: commands.map(command => command._id) },
  );
  if (index === seededCategories.length - 1) {
    console.log('********************************SEED COMPLETED**********************************');
    if (disconnectAfter) await disconnect();
  } else {
    await seedCommands(Category, Command, seededCategories, disconnectAfter, index + 1);
  }
};

export const seed = async () => {
  const models = await connect();
  await dropDatabase();
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const adminCredentials = { email: process.env.ADMIN_EMAIL, password, admin: true };
  const admin = await models.User.create(adminCredentials);
  const seededCategories = await models.Category.create(categories.map(category => ({
    title: category.title,
    userId: admin._id,
  })));
  await seedCommands(models.Category, models.Command, seededCategories);
};

export default seed;
