# Spotistas API

Você precisará registrar o aplicativo no Spotify e obter suas próprias credenciais.

1. Vá para o painel de dashboard em [Spotify for Developers](https://developer.spotify.com/dashboard), faça login em sua conta e crie um novo aplicativo chamado *Spotistas* ou qualquer outro nome.

2. Copia o Client ID e o Client Secret.

3. Siga para **Edit Settings**. Em **Website** adicione `http://localhost:5001`, em **Redirect URIs** adicione `http://localhost:5001/oauth/callback`.

4. Crie um novo arquivo `.env` na raiz do projeto baseado no arquivo [`.env.exemple`](/docs/.env.exemple) e adicione suas credencias do Spotify.

```env
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

## Rotas OAuth

### Autorização

Login do usuário com Spotify. Retorna os token de acesso e atualização (refresh token).

```http
GET http://localhost:5001/oauth
```

### Callback

Rota para o Spotify retornar o código de autorização que será usado para gerar os tokens.

```http
GET http://localhost:5001/oauth/callback
```
