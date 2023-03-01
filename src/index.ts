import http from 'http';
import app from './app';

const PORT = 5001;

app.set('port', PORT);

const server = http.createServer(app);

server
  .listen(PORT, () => {
    console.debug(`Server is running on port ${PORT}`);
  })
  .on('error', err => {
    console.error(err);
  });
