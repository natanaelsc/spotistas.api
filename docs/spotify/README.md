# Spotify

## Aplicativo

1. Vá para o painel de dashboard em [Spotify for Developers](https://developer.spotify.com/dashboard), faça login na sua conta e crie um novo aplicativo chamado *Spotistas* ou qualquer outro nome.

2. Copia o Client ID e o Client Secret.

3. Siga para **Edit Settings**. Em **Website** adicione `http://localhost:5001`, em **Redirect URIs** adicione `http://localhost:5001/oauth/callback`.

4. Adicione suas credencias ao arquivo `.env` criado. Exemplo:

    ```env
    SPOTIFY_CLIENT_ID=seu_client_id_aqui
    SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
    ```
