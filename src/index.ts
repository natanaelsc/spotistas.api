import http from 'http';
import app from './app';
import env from './config/env';

const port = env.node.port;

app.set('port', port);

const server = http.createServer(app);

server
  .listen(port, () => {
    console.debug(`Server is running on port ${port}`);
  })
  .on('error', err => {
    console.error(err);
  });
