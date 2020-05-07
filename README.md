# The Game

Monorepo for the MetaGame applications, backend and databases.


## Development

### Install Packages

```shell script
yarn
```

### Bootstrap

```shell script
cp .env.sample .env
yarn docker:start
```

If you want to locally start the backend server (not in docker) for development purposes, you can set this variable in the .env file:
`HASURA_GRAPHQL_AUTH_HOOK=http://host.docker.internal:4000/auth-webhook`
### Tooling

Start Hasura console

```shell script
yarn hasura:console
```

Hasura CLI example

```shell script
yarn hasura -- migrate squash 1586952135212
```

[Hasura CLI documentation](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/index.html)

Generate GraphQL Types

```shell script
cd packages/graphql-codegen
yarn generate
```

### Restart with fresh database

```shell script
yarn docker:clean
yarn docker:start:local
```

### Run typechecks

```shell script
yarn typecheck
```
