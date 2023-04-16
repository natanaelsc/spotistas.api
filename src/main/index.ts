import 'dotenv/config';
import { HttpStatus } from '../presentation/http';
import Server from './Server';
import routes from './routes';

const server = new Server();

const address = typeof server.address === 'string' ? server.address : `http://localhost:${server.port}`;

const routeList = [
  `${address}/oauth`,
  `${address}/me`,
  `${address}/me/top/artists`,
  `${address}/me/top/tracks`,
  `${address}/me/top/genres`,
  `${address}/artists/month`,
  `${address}/playlists`,
  `${address}/tracks`,
  `${address}/tracks/day`,
  `${address}/tracks/topBrazil`,
];

routes.use('/', (_req, res) => {
  res.status(HttpStatus.OK).json(routeList);
});

routes.use((_req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: 'not found' });
});

server.use(routes);

server.start();
