import express from 'express';
import path from 'path';

class App {
  constructor() {
    this.app = express();
  }

  setup() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '/views'));
    this.app.get('/build.js', (req, res) => {
      res.sendFile('build.js', { root: `${__dirname}/views` });
    });
    this.app.get('/', (req, res) => {
      res.sendFile('index.html', { root: `${__dirname}/views` });
    });
    const port = process.env.PORT || 3000;
    const app = this.app.listen(port);
    console.log(`***********************app running on port ${port}***************************`);
    return app;
  }
}

export default new App();
