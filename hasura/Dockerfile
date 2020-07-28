FROM hasura/graphql-engine:v1.3.0-beta.4.cli-migrations-v2

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## Default setup

ARG BACKEND_HOST
ARG AUTH_HOOK_PATH=auth-webhook
ARG ACTION_BASE_PATH=actions
ARG REMOTE_SCHEMA_PATH=remote-schemas/graphql

ENV HASURA_GRAPHQL_DEV_MODE false
ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_ENABLED_LOG_TYPES startup, http-log, webhook-log, websocket-log, query-log
ENV HASURA_GRAPHQL_AUTH_HOOK http://$BACKEND_HOST/$AUTH_HOOK_PATH
ENV ACTION_BASE_ENDPOINT http://$BACKEND_HOST/$ACTION_BASE_PATH
ENV REMOTE_SCHEMA_ENDPOINT http://$BACKEND_HOST/$REMOTE_SCHEMA_PATH
ENV HASURA_GRAPHQL_MIGRATIONS_DATABASE_ENV_VAR HASURA_GRAPHQL_DATABASE_URL

## Migrations

COPY migrations /hasura-migrations
COPY metadata /hasura-metadata

## Execution

ENTRYPOINT ["/bin/sh", "-c", "/wait && /bin/docker-entrypoint.sh /bin/sh \"$@\""]

CMD graphql-engine serve --server-port $PORT
