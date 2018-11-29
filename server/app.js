import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import Routes from './routes';

class App {
  constructor() {
    this.app = express();
  }

  setup(models) {
    this.app.use(logger('dev'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/api', Routes.routes(models));
    this.app.get('/build.js', (req, res) => {
      res.sendFile('build.js', { root: `${__dirname}/views` });
    });
    this.app.get('/', (req, res) => {
      res.sendFile('index.html', { root: `${__dirname}/views` });
    });
    const port = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT || 3000;
    const app = this.app.listen(port);
    console.log(`***********************app running on port ${port}***************************`);
    return app;
  }
}

export default new App();
