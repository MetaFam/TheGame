# The Game

Monorepo for the MetaGame applications, backend and databases.

Project Board to find tasks / issues to work on: https://github.com/MetaFam/TheGame/projects/1

## Guides

If you're new to the MetaGame codebase, check out the following guides to learn how to contribute.

- [Backend Guide](guides/BACKEND.md)

- [Frontend Guide](guides/FRONTEND.md)

- [C4 Guide](guides/C4.md)

## Development

### Bootstrap

Create your local .env file

```shell script
cp .env.sample .env
```

### Install Packages

```shell script
yarn
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

If you are running for the first time on an empty database, once the services
are running you have two options to populate the database:

1. Populate the database with the production dataset:

```shell script
yarn hasura:seed-local-db
```

2. Populate the database with the initial dataset:

```shell script
curl -X POST http://localhost:4000/actions/migrateSourceCredAccounts?force=true
```

**Troubleshooting**

In case non of the above commands are working try purge the docker containers and images you can do this by running (notice: this removes all the containers and images on your computer!):

```shell script
docker system prune -a
```

**Rebuild backend services**

If your docker containers fail to start due to changes in config, you may need to rebuild the containers. This can take several minutes.

```shell script
yarn docker:build
```

**Stop backend services**

```shell script
yarn docker:stop
```

- Stops all the containers

If you want to locally start the backend server (not in Docker) for debugging purposes:

```shell script
yarn backend:dev
```

### Run NextJS Web App dev mode (new)

```shell script
yarn web:dev
```

Go to [http://localhost:3000](http://localhost:3000)

Happy Coding!

### Run Discord Bot

```shell script
yarn discord-bot dev
```

### Tooling

Start Hasura console

```shell script
yarn hasura:console
```

Hasura CLI example

```shell script
yarn hasura migrate status
yarn hasura migrate squash --name "<feature-name>" --from 1598417879553
yarn hasura migrate apply --version "<squash-migration-version>" --skip-execution
```

[Hasura CLI documentation](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/index.html)
[Hasura Migrations Guide](https://hasura.io/docs/1.0/graphql/manual/migrations/basics.html#migrations-basics)

Generate GraphQL Types

```shell script
yarn generate
```

Reload Schema + Generate GraphQL Types (backend needs to be running)

```shell script
yarn update-schema
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
