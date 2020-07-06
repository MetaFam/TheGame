# The Game

Monorepo for the MetaGame applications, backend and databases.


## Development

### Install Packages

```shell script
yarn
```

### Bootstrap

Create your local .env file

```shell script
cp .env.sample .env
```

### Run services

**Start backend services**
```shell script
yarn docker:start
```
- Runs docker containers for backend, Hasura Engine, and PostGres database
- will auto-restart on any changes to `packages/backend` and `packages/utils`

**Stop backend services**
```shell script
yarn docker:stop
```
- Stops all the containers


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
yarn docker:start
```

### Run typechecks

```shell script
yarn typecheck
```
