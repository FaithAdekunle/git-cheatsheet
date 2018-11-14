import mongoose from 'mongoose';
import dotenv from 'dotenv';
import models from './models';

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
  models.models(mongoose);
  resolve(models);
});

export const disconnect = () => mongoose.disconnect();

export const dropDatabase = () => new Promise(async (resolve) => {
  await mongoose.connection.db.dropDatabase();
  resolve();
});
