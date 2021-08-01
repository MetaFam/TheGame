# MetaGame's FrontEnd API Guide

## Requirements

In order to develop MetaGame FrontEnd components, you need.

- Node.js

- Yarn

You can either choose to only develop the frontend and use our deployed backend services, or run the services on your own machines. If you're about to only work on UI, it's much quicker to connect to the remote servers.

### Install dependencies

```bash
yarn
```

### Connecting to remote servers

To connect to production servers, you'll need to create a file `.env.local` under `packages/web` and write this inside:

```
NEXT_PUBLIC_GRAPHQL_URL=https://api.metagame.wtf/v1/graphql
```

### Connecting to local server

If you want to connect to locally running backend services, you will need to be able to start the backend with:

```bash
yarn docker:start
```

If you have difficulties running the backend, checkout the [Backend Guide](BACKEND.md).

## Starting web app in dev mode

Once you are ready to connect to the backend, you can start the web app by using:

```bash
yarn web:dev
```

Go to [http://localhost:3000](http://localhost:3000)

Happy Coding!

## Creating GraphQL queries

In both the `web` and `metamaps` folder, all GraphQL queries are hosted in a folder called `graphql`.

```
web/graphql
metamaps/graphql
```

Related queries and mutations should be in the same file.

### Creating a GraphQL query

Queries are to pull and retrieve data from the database. In the following example we will be using the `Map` table as an example.

```typescript
import gql from 'fake-tag';

export const GetMapQuery = gql`
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
  ...
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

You can actually review all queries and mutations available in Hasura on `http://localhost:9695`.

### Integrating the GraphQL query

In order to integrate the GraphQL query you need to use the `useQuery` function in the `urql` package. You will also need to import the GraphQL query created. The following showcases how to use the query with a React functional component.

```typescript
import React, { FC } from 'react';
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
import gql from 'fake-tag';

export const CreateMap = gql`
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
