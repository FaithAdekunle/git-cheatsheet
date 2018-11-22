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

export const connect = async () => {
  await mongoose.connect(db());
  return Models.models(mongoose);
};

export const disconnect = () => new Promise(resolve => mongoose.disconnect().then(() => resolve()));

export const dropDatabase = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const setup = async () => {
  const models = await connect();
  return { app: app.setup(models), models };
};
