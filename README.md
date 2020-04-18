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

### Restart with fresh database

```shell script
yarn docker:clean
yarn docker:start:local
```
