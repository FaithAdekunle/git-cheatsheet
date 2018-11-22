import bcrypt from 'bcrypt';
import { seedCommands } from '../seeds/seed';

export const categories = [
  {
    title: 'Install GIT',
    commands: [
      { script: 'brew install git', description: 'Install git on macOS with Homebrew', keywords: ['install', 'macos', 'homebrew'] },
      { script: 'sudo apt-get install git', description: 'Install git on Debian-based linux', keywords: ['install', 'apt-get', 'debian', 'linux'] },
      { script: 'choco install git', description: 'Install git on Windows with Chocolatey', keywords: ['install', 'windows', 'choco'] },
    ],
  },
  {
    title: 'Configuration',
    commands: [
      { script: 'git config --global user.name [name]', description: 'Sets the name you want attached to your commit transaction', keywords: ['configuration', 'name', 'email', 'user'] },
      { script: 'git config --global user.email [email address]', description: 'Sets the email you want attached to your commit transactions', keywords: ['configuration', 'name', 'email', 'user'] },
      { script: 'git config --global color.ui auto', description: 'Enables helpful colorization of command line output', keywords: ['configuration', 'color', 'ui', 'customization'] },
    ],
  },
];

const seed = async (models) => {
  const { User, Command, Category } = models;
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const adminCredentials = { email: process.env.ADMIN_EMAIL, password, admin: true };
  const admin = await User.create(adminCredentials);
  const seededCategories = await Category.create(categories.map(category => ({
    title: category.title,
    userId: admin._id,
  })));
  await seedCommands(Category, Command, seededCategories, false);
};

export default seed;
