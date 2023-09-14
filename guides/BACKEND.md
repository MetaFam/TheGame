## MetaGame's BackEnd API Guide

### Stack

- Express
- Hasura
- Docker

### Requirements

To run the MetaGame backend you will the following installed.

- Node.js
- Docker

### Configuration

Before you can start the Docker containers, you must run the following.

```bash
# Copy the example environment
cp .env.sample .env

# Add a github token from https://github.com/settings/tokens to the .env (Default read-only scope is good)
echo "GITHUB_API_TOKEN=<github-token>" >> .env

# Remove potential stale containers
yarn docker:clean

# Install node dependencies
yarn

# Build typescript apps
yarn typecheck
```

### Starting the BackEnd

After the above is configured, you can start the Docker containers.

```bash
yarn docker:start
```

### Getting Started

After running `yarn docker:start` _(or `yarn docker:dev` if you want the logs printed to the console)_ make sure to confirm the backend is running.

```bash
# Confirm the backend works
$ curl localhost:4000

# This should output
ok
```

You can debug further if there are problems by running `docker ps`.

```bash
$ docker ps

# Check to see if there are any issues with the docker containers.
CONTAINER ID  IMAGE            COMMAND                  CREATED             STATUS              PORTS                    NAMES
6355ef5641a0  the-game_backend "docker-entrypoint.s…"   51 minutes ago      Up 2 minutes        0.0.0.0:4000->4000/tcp   the-game_backend_1
970f1ffb79c8  the-game_hasura  "/bin/sh -c '/wait &…"   51 minutes ago      Up 2 minutes        0.0.0.0:8080->8080/tcp   the-game_hasura_1
38e3140ab632  postgres:12      "docker-entrypoint.s…"   51 minutes ago      Up 2 minutes        0.0.0.0:5432->5432/tcp   the-game_database_1
```

You can also read the logs of the services by running `docker-compose logs -f $SERVICE` (replace \$SERVICE by `backend` or `hasura`)

```bash
$ docker-compose logs -f backend

...
backend_1   | @metafam/backend: [1] [18:59:07] Generate ./src/lib/autogen/daohaus-sdk.ts [completed]
backend_1   | @metafam/backend: [1] [18:59:07] Generate outputs [completed]
backend_1   | @metafam/backend: [1]   ℹ Watching for changes...
backend_1   | @metafam/backend: [0] Listening on port 4000
```

After which you can run:

```bash
yarn hasura:seed-db
```

Which populates it with testing data.

### Run backend without docker for debugging

If you want to run the NodeJS backend service out of docker to be able to debug with your IDE:

**Add environment variable** to tell hasura where to find the backend (may only work on MacOS)

```shell script
echo 'BACKEND_HOST=host.docker.internal:4000' >> .env
```

**Start the server**

```shell script
yarn backend:dev
```

### Configuring Hasura

Before you can create a new table. You'll need to initialize hasura. The same commands are found in the tooling section of the `README.md`.

```bash
# Start the console
yarn hasura:console

# Confirm that hasura is running
yarn hasura migrate status
...
```

### Adding a table

- First, navigate to `http://localhost:9695/`. The Hasura Dashboard should appear.

- You can click on the `DATA` tab or navigate to `http://localhost:9695/console/data/schema/public`.

- Click "Create Table"

When creating a table, keep in mind a few things.

1. You should have an `id` for all table relationships and all datatypes should use snake_case.

   - **Example 1:** Table Name: "hello" && Table ID: "hello_id" (as a UUID)

   - **Example 2:** Table Name: "map" && Table ID: "map_id" (as a UUID)

2. You should be mapping objects as foreign keys to their respective UUID. For example if you made a new table that holds a player's messages, it would be something like:

   - From: player_id

   - To: Player.id

### Updating the GraphQL schemas

Assuming the Docker Containers are running. After creating the table. You will need to run:

```bash
yarn update-schema

# and then
yarn generate
```

This will update the `.graphql` schemas for Hasura and make it easier to create graphql queries for the frontend.

### Updating Permissions

By default, only admins are allowed to change the permissions. In order to query, add and update data as other than the admin, you'll need to change the permissions.

1. You will need to select the new table you created on the data the Data tab in the Hasura Console.

2. You will need to select the table you created under `Tables/Views/Functions`.

3. Select the permissions tab and then select either `insert`, `select`, `update` and `delete` for `player` or `public`.

4. Generally, you will want to have a custom check. For the most part, data should only be inserted and deleted based on their user id. The following is a custom check you could create for `Row insert permissions` or `Pre-update check` or `Row delete permissions`.

```json
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

5. Furthermore, when selecting or updating data. You can add permissions for specific columns. You select which ones should be allowed via the provided checkboxes.

6. Finally, make sure that the changes for permissions are updated in `hasura/metadata/tables.yaml`.
   `Pre-update check`nsert and read data immediately. There are pre-generated functions that come with Hasura. For creating new entries. The following are example queries you could send immediately to `http://localhost:8080/v1/graphql`.

### Mutations and Querying

The following are examples of how you can use CRUD to interact with new tables in Hasura.

1. Insert a new item

```graphql
# Insert a new item, assuming `Item` is the table name
mutation insert {
  # Built in function with Hasura GraphQL
  insert_Item_one(
    # The respective columns
    object: { data: "..." }
  ) {
    # The keys to return on a successful insertion
    id
    data
  }
}
```

As long as it fits the constraints of the table (ie: Foreign Key uniqueness, Data types), the insertion should be successful.

2. Update an item using the `where` clause

```graphql
mutation update {
  # Built in Hasura function
  update_Item(
    where: {
      # Can also use _gt, _gte, _lt, _lte, _neq etc.
      # Can also specify any column
      id: { _eq: "[UUID]" }
    }
    # The columns you want to update
    _set: { data: "..." }
  ) {
    # you can either supply `returning` or `affected_rows` for the response
    affected_rows
  }
}
```

You can also update by `id` as well too.

```graphql
mutation updateByKey {
    update_Item_by_pk(
        pk_columns: {id: "[UUID]"},
        _set: { ...data }
    ) {
        # Any columns that exist on the `Item` table
        id
        ...data
    }
}
```

3. Delete an item using the `where` clause

```graphql
mutation delete {
  delete_Item(
    where: {
      # Can also use _gt, _gte, _lt, _lte, _neq etc.
      # Can also specify any column
      id: { _eq: "[UUID]" }
    }
  ) {
    # you can either supply `returning` or `affected_rows` for the response
    affected_rows
  }
}
```

You can also delete by `id` as well too.

```graphql
mutation deleteByKey {
  delete_Item_by_pk(id: "[UUID]") {
    # Any columns that exist on the `Item` table
    id
    ...data
  }
}
```

4. And of course, querying items by using the generated `Item` object

```graphql
query get {
  Item(
    where: {
      # Can also use _gt, _gte, _lt, _lte, _neq etc.
      # Can also specify any column
      id: { _eq: "[UUID]" }
    }
    # Maximum number of results
    limit: 10
    # Pagination
    offset: 0
    # Sorting
    order_by: {
      # asc - ascending, desc - descending
      # Can also specify any column
      id: asc
    }
  ) {
    # The keys to return on a successful query
    id
    data
  }
}
```

You can also query by `id` as well too.

```graphql
query getByKey {
  Item_by_pk(id: "[UUID]") {
    # The keys to return on a successful query
    id
    ...data
  }
}
```

---

These requests can be sent on the fly to the backend at any time. In the front end guide, it goes over how to create `urql` and `apollo` requests to update and modify data via a React app.

If you'd like to learn more about the GraphQL syntax check out the guides from Hasura:

- [Hasura Queries](https://hasura.io/docs/1.0/graphql/core/queries/index.html#queries)
- [Hasura Mutations](https://hasura.io/docs/1.0/graphql/core/mutations/index.html)
