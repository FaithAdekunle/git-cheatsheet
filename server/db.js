import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Models from './models';

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

const models = new Models();

export const connect = () => new Promise(resolve => mongoose.connect(db()).then(() => {
  models.models(mongoose);
  resolve(models);
}));

export const disconnect = () => mongoose.disconnect();

export const dropDatabase = () => new Promise(resolve => mongoose.connection.db.dropDatabase()
  .then(() => resolve()));
