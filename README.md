# Spotistas API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=spotistas_spotistas.api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=spotistas_spotistas.api) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=spotistas_spotistas.api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=spotistas_spotistas.api) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=spotistas_spotistas.api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=spotistas_spotistas.api) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=spotistas_spotistas.api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=spotistas_spotistas.api) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=spotistas_spotistas.api&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=spotistas_spotistas.api)

## Instruções

### Requisitos

Tenha o [Node.js](https://nodejs.org/en/) e [Docker](https://www.docker.com/get-started/) instalados e configurado.

### Execução

1. Clone este repositório.

    ```sh
    git clone https://github.com/spotistas/spotistas.api.git
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Crie o arquivo .env na raiz do projeto baseado no arquivo [.env.exemple](/docs/.env.exemple) e adicione as credenciais de seu [aplicativo Spotify](/docs/spotify/README.md#aplicativo).

4. Execute o projeto:

    ```sh
    npm run start:db && npm run start:dev
    ```

* Para derrubar o container Docker do Postgres, execute:

    ```sh
    npm run compose:down
    ```
