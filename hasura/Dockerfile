FROM hasura/graphql-engine:v1.1.1.cli-migrations

## Default setup

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_ENABLE_CONSOLE false
ENV HASURA_GRAPHQL_ENABLED_LOG_TYPES startup, http-log, webhook-log, websocket-log, query-log
ENV HASURA_GRAPHQL_UNAUTHORIZED_ROLE public

## Migrations

COPY migrations /hasura-migrations
ENV HASURA_GRAPHQL_MIGRATIONS_DATABASE_ENV_VAR DATABASE_URL

## Execution

CMD graphql-engine \
  --database-url $DATABASE_URL \
  serve \
  --server-port $PORT
