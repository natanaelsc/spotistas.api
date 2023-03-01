# Spotistas

## Commit

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0) como regra para mensagens de commit. As mensagens devem ser formatadas usando um dos seguintes prefixos:

* **feat**     → Adição de funcionalidade.
* **fix**      → Correção de defeito.
* **docs**     → Mudança em documentação.
* **style**    → Mudança de formatação ou estilo, que não afeta a execução do código (espaço, tabulação, etc).
* **refactor** → Mudança na organização do código, que não afeta o comportamento existente.
* **test**     → Adição ou mudança de um teste.
* **chore**    → Adição ou mudança em script de build, que não afeta o código de produção.
* **perf**     → Mudança de código para melhoria de desempenho.
* **ci**       → Mudança de configuração de integração contínua.
* **build**    → Mudança em arquivos de build ou em dependências externas.

### scope

Opcional, pode ser qualquer coisa que especifique o escopo da mudança.
Exemplos: sub-pacote, workspace, módulo, componente, página.

### subject

Breve resumo da mudança, escrito no tempo verbal presente. Começa com letra minúscula e não há ponto final.

#### Exemplo de formatação

```sh
git commit -m "feat: add subject"
git commit -m "feat(scope): add subject"
```

## Gitflow

Utilize a ideia de fluxo de trabalho do Gitflow. Recomendo que utilize o comando `git checkout -b` ao invés da ferramenta Gitflow.

### Ramificações

* **feature** → Ramificação de novo recurso.
* **release** → Ramificação de lançamento de novos recursos.
* **hotfix** → Ramificação de manutenção.

### Fluxo

1. A branch `main` é a branch de produção.

2. A branch `feature` é criada a partir de `develop`.

3. Quando uma `feature` é concluída, ela é mesclada a branch `develop`.

4. A branch `release` é criada a partir de `develop`.

5. Quando um `release` é concluído, ele é mesclado as branch `develop` e `main`.

6. Se um problema for detectado em produção (`main`), uma branch de `hotfix` será criada a partir da `main`.

7. Depois que o `hotfix` é concluído, ele é mesclado mesclada em `develop` e `main`.

#### Exemplo

```sh
git checkout develop
git checkout -b feature/docs
git add docs/CONTRIBUTING.md
git commit -m "docs: add something new"
git push origin feature/docs
```

Veja mais detalhes nesse [tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

## Instalação

1. Instale o [Node.js](https://nodejs.org/en).

2. Clone o repositório `https://github.com/spotistas/spotistas.api.git` na pasta que deseja trabalhar.

3. Na pasta do projeto, execute `npm install` para instalação das dependências.

4. Execute `npm run start:dev` para rodar o servidor.
