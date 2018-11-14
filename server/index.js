import app from './app';
import { connect } from './db';

const setup = () => new Promise(async (resolve) => {
  await connect();
  resolve(app.setup());
});

setup();

export default setup;
