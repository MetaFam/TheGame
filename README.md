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

Initial TS Compilation For Monorepo Packages

```shell script
yarn typecheck
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

If you want to locally start the backend server (not in Docker) for debugging purposes:

```shell script
yarn backend:dev
```

Set this variable in the .env file:

```
BACKEND_HOST=host.docker.internal:4000
```

### Run web app (old)

Once the backend services are started, we can start the frontend application

```shell script
yarn app:start
```

### Run NextJS Web App dev mode (new)

```shell script
yarn web:dev
```

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
