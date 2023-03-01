import dotenv from 'dotenv';

dotenv.config({
  encoding: 'utf8',
});

const env = {
  node: {
    port: Number(process.env.PORT),
    cors: String(process.env.CORS).split(','),
  },
  spotify: {
    client_id: String(process.env.SPOTIFY_CLIENT_ID),
    client_secret: String(process.env.SPOTIFY_CLIENT_SECRET),
    redirect_uri: String(process.env.SPOTIFY_REDIRECT_URI),
  },
};

export default env;
