import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Models from './models';
import app from './app';

dotenv.config();

const db = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.DB_PRODUCTION;
    case 'test':
      return process.env.DB_TEST;
    default:
      return process.env.DB_DEVELOPMENT;
  }
};

export const connect = () => new Promise(async (resolve) => {
  await mongoose.connect(db());
  const models = Models.models(mongoose);
  resolve(models);
});

export const disconnect = () => new Promise(resolve => mongoose.disconnect().then(() => resolve()));

export const dropDatabase = () => new Promise(async (resolve) => {
  await mongoose.connection.db.dropDatabase();
  resolve();
});

export const setup = () => new Promise(async (resolve) => {
  const models = await connect();
  resolve({ app: app.setup(models), models });
});
