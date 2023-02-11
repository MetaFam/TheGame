These are representations of our data models for ComposeDB on the Ceramic network.

Commands should be executed from the ROOT of the project, not this directory.

## user-profile.graphql

This is the source of truth, our models defined in a GraphQL Composite Schema.

## user-profile-compose.json

This is generated with the command

`DID_PRIVATE_KEY=<key> yarn composedb:create-composite`

It must be deployed to a ceramic node before use:

`DID_PRIVATE_KEY=<key> yarn composedb composite:deploy packages/utils/schema/user-profile-composite.json`

## user-profile-defition.json

This is used for the graphql HTTP server (see below).

Generate with `yarn composedb:create-definition`

## packages/web/graphql/composedb/autogen/\*.ts

These are the graphql models defined in TypeScript, for use in building queries on the client-side.

Generate with `yarn web generate:composedb`

# GraphQL server

The ComposeDB CLI provides a command for spinning up a GraphQL HTTP server with graphiql embedded, as a nice interface for querying and mutating data.

Start it with `yarn composedb:graphql-server`

Example query:

```
{
  profileNameIndex(first:1) {
    edges {
      node {
        name
      }
    }
  }
}
```
