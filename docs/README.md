# Spotistas API

## Endpoint

### OAuth

Aqui a requisição deve ser feita em um navegador web onde o token de acesso deve ser retornado no cookie.

#### Autenticação

```http
GET http://localhost:5001/oauth
```

Redireciona o usuário para a página de login do provedor oauth.
Após o aceite dos termos, é redirecionado novamente para o cliente da requisição.
Altere no arquivo `.env` em `CLIENT_URI` para a url do cliente frontend.

#### Callback

```http
GET http://localhost:5001/oauth/callback
```

É chamado pelo provedor oauth após o usuário concluir com sucesso a autenticação e aceite dos termos.
