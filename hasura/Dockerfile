FROM hasura/graphql-engine:v1.2.1.cli-migrations-v2

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## Default setup

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_ENABLED_LOG_TYPES startup, http-log, webhook-log, websocket-log, query-log

## Migrations

COPY migrations /hasura-migrations
COPY metadata /hasura-metadata
ENV HASURA_GRAPHQL_MIGRATIONS_DATABASE_ENV_VAR DATABASE_URL

## Execution

ENTRYPOINT ["/bin/sh", "-c", "/wait && /bin/docker-entrypoint.sh /bin/sh \"$@\""]

CMD graphql-engine \
  --database-url $DATABASE_URL \
  serve \
  --server-port $PORT
