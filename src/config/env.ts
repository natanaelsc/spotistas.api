import dotenv from 'dotenv';

dotenv.config({
  encoding: 'utf8',
});

const config = {
  node: {
    env: String(process.env.NODE_ENV),
    port: Number(process.env.PORT),
    cors: String(process.env.CORS).split(','),
    log_level: String(process.env.LOG_LEVEL),
  },
  spotify: {
    client_id: String(process.env.SPOTIFY_CLIENT_ID),
    client_secret: String(process.env.SPOTIFY_CLIENT_SECRET),
    redirect_uri: String(process.env.SPOTIFY_REDIRECT_URI),
    scope: String(process.env.SPOTIFY_SCOPE),
    show_dialog: String(process.env.SPOTIFY_SHOW_DIALOG),
  },
  client_uri: String(process.env.CLIENT_URI),
};

export default config;
