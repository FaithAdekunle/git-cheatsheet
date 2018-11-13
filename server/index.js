import app from './app';
import { connect } from './db';

connect();

export default app.setup();
