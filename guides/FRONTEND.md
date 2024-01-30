# MetaGame's FrontEnd API Guide

## Requirements

In order to develop MetaGame FrontEnd components, you need.

- Node.js (the current setup is using lts/gallium (16.13.1))

- Yarn _(v1.19.0 as some later versions throw errors when adding dependencies)_ _(to set yarn's version: `yarn policies set-version 1.19.0`)_

You can either choose to only develop the frontend and use our deployed backend services, or run the services on your own machines. If you're only going to work on UI, it's much quicker to connect to the remote servers.

### Install dependencies

```bash
yarn
```

### Connecting to remote servers

To connect to staging servers, you'll need to create a file `.env` under `packages/web/` and write this inside:

```bash
NEXT_PUBLIC_GRAPHQL_URL=https://api-staging.metagame.wtf/v1/graphql
```

### Enabling profile image editing

The storage of images associated with a profile is in [web3.storage](//web3.storage). In order to be able to connect, you will need to create an API token and save it in `packages/web/.env` as `WEB3_STORAGE_TOKEN`.

### Connecting to local server

If you want to connect to locally running backend services, you will need to be able to start the backend with:

```bash
yarn docker:start
```

Or, if you prefer to be able to see the output from the backend:

```bash
docker-compose up --build
```

If you have difficulties running the backend, checkout the [Backend Guide](BACKEND.md).

## Starting web app in dev mode

Once you are ready to connect to the backend, you can start the web app by using:

```bash
yarn web:dev
```

Go to [localhost:3000](http://localhost:3000).

Happy Coding!

## Creating GraphQL queries

The GraphQL queries are created by running, first, `yarn update-schema` which exports a GraphQL schema from Hasura, then, `yarn generate` which combines that schema with additional programmer-provided queries and mutations.

The programmer contributions can be found at:

- `packages/web/graphql/`
- `packages/backend/src/handlers/graphql/`

Related queries and mutations should be in the same file.

### Creating a GraphQL query

Queries are to pull and retrieve data from the database. In the following example we will be using the `Map` table as an example.

```typescript
export const GetMapQuery = /* GraphQL */ `
  query GetMap($id: uuid!) {
    Map_by_pk(id: $id) {
      id
      author_address
      name
      data
    }
  }
`;
```

In the above example we retrieved a map by id. There are several key things you need to factor in the implementation.

1. The parameters, if you look at:

```graphql
query GetMap($id: uuid!) {
  ⋮
```

We provided a `$id`. It is important that all queries and mutations have parameters that are prefixed with a `$`.

2. The returned columns:

```graphql
{
  id
  author_address
  name
  data
}
```

Specifying these columns are important depending on what data you need to pull to the frontend.

3. The Hasura related function:

```graphql
Map_by_pk(id: $id)
```

You can actually review all queries and mutations available in Hasura on `http://localhost:9695` by running `yarn hasura console`.

### Integrating the GraphQL query

In order to integrate the GraphQL query you need to use the `useQuery` function in the `urql` package. You will also need to import the GraphQL query created. The following showcases how to use the query with a React functional component.

```typescript
import { FC } from 'react';
import { useQuery } from 'urql';
import { GetMapQuery } from '/path/to/query';

export const Component: FC = () => {
  const id = 'uuid';

  const [result] = useQuery({
    query: GetMapQuery,
    variables: { id },
  });

  const { data, fetching, error } = result;

  return(
    ...
  )
}
```

#### Optional, use useEffect

You can also useEffect to rexecute queries based on changes to variables in GraphQL.

```typescript
import React, { FC, useEffect } from 'react';
import { useQuery } from 'urql';
import { GetMapQuery } from '/path/to/query';

export const Component: FC = ({ id }) => {
  const [result, reexecuteQuery] = useQuery({
    query: GetMapQuery,
    variables: { id },
  });

  useEffect(() => {
    reexecuteQuery();
    // Add variables to the array to trigger when the query is updated
  }, [id]);

  const { data, fetching, error } = result;

  return(
    ...
  )
}
```

Keep in mind the following parts of the query state:

1. fetching is a boolean that indicates whether or not the query is loading

2. error is whether or not an error was thrown executing the query

3. data is the data returned from the query

## Creating GraphQL mutations

GraphQL mutations are used to update and insert new data into the database. The following is an example of inserting data into the `Map` table.

```typescript
export const CreateMap = /* GraphQL */ `
  mutation createMap($author: String!, $name: String!) {
    insert_Map_one(object: { author_address: $author, name: $name, data: "" }) {
      id
    }
  }
`;
```

For the most part, the key things to be mindful of syntax are the same as seen in the query section.

### Integrating the GraphQL mutation

In order to use the mutation, you will need to use the `useMutation` function in the `urql` package. Mutations typically should only be done via user interactions. The following example showcases how a button triggers a mutation.

```tsx
import React, { FC } from 'react';
import { useMutation } from 'urql';
import { CreateMap } from '/path/to/query';

export const Component: FC = () => {
  const [state, executeMutation] = useMutation(CreateMap);
  const { fetching, error, data } = state;

  async function insertMap(author, name) {
    try {
      await executeMutation({ author, name });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button type="button" onClick={() => insertMap('Hello World', 'Test 1234')}>
      Generate
    </button>
  );
};
```

Keep in mind the following parts of the mutation state:

1. fetching is a boolean that indicates whether or not the mutation is loading

2. error is whether or not an error was thrown executing the mutation

3. data is the data returned from the mutation

For the most part the structure of states are relatively the same to queries.
