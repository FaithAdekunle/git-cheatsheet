import categories from './categories';
import { connect, disconnect, dropDatabase } from '../db';


const seedCommands = (Category, Command, seededCategories, index = 0) => {
  const seededCategory = seededCategories[index];
  const nextCategory = categories.find(category => category.title === seededCategory.title);
  Command
    .create(nextCategory.commands.map(command => ({ ...command, category: seededCategory._id })))
    .then(() => {
      if (index === seededCategories.length - 1) {
        console.log('*********************FINISHED SEEDING SUCCESSFULLY*********************');
        disconnect();
      } else {
        seedCommands(Category, Command, seededCategories, index + 1);
      }
    });
};

connect().then((models) => {
  dropDatabase();
  models.Category.create(categories.map(category => ({
    title: category.title,
    description: category.description,
  }))).then((seededCategories) => {
    seedCommands(models.Category, models.Command, seededCategories);
  });
});
