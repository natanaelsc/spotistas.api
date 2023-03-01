import dotenv from 'dotenv';

dotenv.config({
  encoding: 'utf8',
});

export default {
  spotify: {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  },
};
