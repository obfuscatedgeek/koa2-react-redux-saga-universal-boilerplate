import path from 'path';
import CONF from '../../conf';

import Koa from 'koa';
import Pug from 'koa-pug';
import serve from 'koa-static';

import universal_renderer from './utils/universal_renderer';

const BASE_DIR = path.resolve(__dirname, '../../');

const app = new Koa();

// serve statics
app.use(serve(path.resolve(BASE_DIR, 'dist')));

const pug = new Pug({
  viewPath: path.resolve(BASE_DIR, 'src/server/views'),
  app,
  noCache: true
});

app.use(universal_renderer);

app.listen(CONF.PORT, 'localhost', err => {
  if (err) return console.log('Error starting server', err);
  console.log(`Server running on ${CONF.PORT}`);
});
