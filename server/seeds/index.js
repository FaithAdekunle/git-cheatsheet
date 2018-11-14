import categories from './categories';
import { connect, disconnect, dropDatabase } from '../db';


const seedCommands = async (Category, Command, seededCategories, index = 0) => {
  const seededCategory = seededCategories[index];
  const nextCategory = categories.find(category => category.title === seededCategory.title);
  const commands = await Command
    .create(nextCategory.commands.map(command => ({ ...command, category: seededCategory._id })));
  await Category.findOneAndUpdate(
    { _id: seededCategory._id },
    { commands: commands.map(command => command._id) },
  );
  if (index === seededCategories.length - 1) {
    console.log('********************************SEED COMPLETED**********************************');
    disconnect();
  } else {
    seedCommands(Category, Command, seededCategories, index + 1);
  }
};

const seed = async () => {
  const models = await connect();
  dropDatabase();
  await models.Admin
    .create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  const seededCategories = await models.Category.create(categories.map(category => ({
    title: category.title,
    description: category.description,
  })));
  seedCommands(models.Category, models.Command, seededCategories);
};

seed();
