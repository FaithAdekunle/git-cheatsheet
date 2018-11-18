import bcrypt from 'bcrypt';
import categories from './categories';
import { connect, disconnect, dropDatabase } from '../db';


export const seedCommands = (
  Category,
  Command,
  seededCategories,
  disconnectAfter = true,
  index = 0,
) => new Promise(async (resolve) => {
  const seededCategory = seededCategories[index];
  const nextCategory = categories.find(category => category.title === seededCategory.title);
  const commands = await Command
    .create(nextCategory.commands.map(command => ({ ...command, categoryId: seededCategory._id })));
  await Category.findOneAndUpdate(
    { _id: seededCategory._id },
    { commands: commands.map(command => command._id) },
  );
  if (index === seededCategories.length - 1) {
    console.log('********************************SEED COMPLETED**********************************');
    if (disconnectAfter) await disconnect();
    resolve();
  } else {
    await seedCommands(Category, Command, seededCategories, disconnectAfter, index + 1);
    resolve();
  }
});

export const seed = () => new Promise(async (resolve) => {
  const models = await connect();
  await dropDatabase();
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await models.Admin
    .create({ email: process.env.ADMIN_EMAIL, password });
  const seededCategories = await models.Category.create(categories.map(category => ({
    title: category.title,
    description: category.description,
  })));
  await seedCommands(models.Category, models.Command, seededCategories);
  resolve();
});

export default seed;
