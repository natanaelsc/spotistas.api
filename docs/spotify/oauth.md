# Fluxo OAuth

O primeiro passo é solicitar a autorização do usuário final, para que o app possa acessar os recursos do Spotify em nome desse usuário.

Para fazer isso, o aplicativo deve criar e enviar uma solicitação **GET** para o endpoint */authorize* do Spotify com os seguintes parâmetros:

* **client_id**: *o ID do cliente que você recebeu quando se registrou.*

* **response_type**: *o tipo de resposta que você deseja receber. Para solicitar uma autorização de código de acesso, use o valor code.*

* **redirect_uri**: *a URI de redirecionamento que você configurou quando se registrou.*

* **state**: *um valor aleatório gerado pelo aplicativo que será usado para verificar a validade da resposta.*

* **scope**: *uma lista separada por espaços de escopos de acesso que você deseja solicitar.*

## Scope

Para solicitar mais de um escopo é necessário separar por espaço.

Por exemplo, para solicitar acesso ao perfil do usuário e ao e-mail, use o valor *user-read-private user-read-email*.

Você pode encontrar uma lista completa de escopos de acesso disponíveis [aqui](https://developer.spotify.com/documentation/general/guides/authorization/scopes/).

## Redirect URI

O Spotify irá redirecionar o usuário para a URI de redirecionamento que você especificou, acrescentando um código de autorização e um valor de estado à URI.

Por exemplo, se você configurou a URI de redirecionamento como <http://localhost:5001/oauth/callback>, o Spotify irá redirecionar o usuário para <http://localhost:5001/oauth/callback?code=AQD...&state=34fFs29kd09>.

## State

O valor de estado é o mesmo valor que você enviou na solicitação de autorização.

O aplicativo deve verificar se o valor de estado retornado é o mesmo que o valor de estado enviado. Se não for, o aplicativo deve ignorar a resposta.

## Authorization Code

O código de autorização é um código de uso único que pode ser trocado por um token de acesso. Ele é recebido através da URI de redirecionamento juntamente com o valor de estado.

O aplicativo deve usar o código de autorização para solicitar um token de acesso. Para fazer isso, o aplicativo deve enviar uma solicitação **POST** para o endpoint */api/token* com os seguintes parâmetros:

* **grant_type**: *o tipo de token que você está solicitando. Para solicitar um token de acesso, use o valor **authorization_code**.*

* **code**: *o código de autorização que você recebeu na etapa anterior.*

* **redirect_uri**: *a URI de redirecionamento que você configurou quando se registrou.*

O aplicativo deve enviar o ID do cliente e o segredo do cliente como parte da solicitação.

Para fazer isso, o aplicativo deve codificar o ID do cliente e o segredo do cliente em base64 e incluir o resultado no cabeçalho da solicitação.

Por exemplo, se o ID do cliente for *my-client-id* e o segredo do cliente for *my-client-secret*, o aplicativo deve enviar o cabeçalho **Authorization** com o valor `Basic bXktY2xpZW50LWlkOm15LWNsaWVudC1zZWNyZXQ=`.

O Spotify irá responder com um token de acesso e um *refresh token*.

## Tokens

* **access token** → Usado para acessar os recursos do Spotify em nome do usuário. Expira após 1 hora.

* **refresh token** → Usado para renovar o *access token* quando ele expirar. O *refresh token* expira após 60 dias. Quando o *access token* expirar, o aplicativo deve usar o *refresh token* para solicitar um novo *access token*.

## Referência

<https://developer.spotify.com/documentation/general/guides/authorization/code-flow>

<https://github.com/spotify/web-api-examples>
