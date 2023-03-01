# Spotistas

Você precisará registrar o aplicativo no Spotify e obter suas próprias credenciais.

1. Vá para o painel de dashboard em [Spotify for Developers](https://developer.spotify.com/dashboard), faça login em sua conta e crie um novo aplicativo chamado *Spotistas* ou qualquer outro nome.

2. Copia o Client ID e o Client Secret.

3. Siga para **Edit Settings**. Em **Website** adicione `http://localhost:5001`, em **Redirect URIs** adicione `http://localhost:5001/oauth/callback`.

4. Crie um novo arquivo `.env` na raiz do projeto baseado no arquivo [`.env.exemple`](/docs/.env.exemple) e adicione suas credencias do Spotify.

```env
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```
