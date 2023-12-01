FROM node:16-slim as base
WORKDIR /usr/src/app

# Install dependencies not included in the slim image
RUN apt-get update && \
    apt-get install -y --no-install-recommends g++ make python git openssl && \
    apt-get install -y --no-install-recommends --reinstall ca-certificates

# Install dependencies for dev and prod
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY schema.graphql .
COPY tsconfig.base.json .
COPY packages/discord-bot/*.json ./packages/discord-bot/
COPY packages/utils/*.json ./packages/utils/

RUN yarn install --pure-lockfile

# Dev environment doesn't run this stage or beyond
FROM base as build

# Copy source files
COPY packages/discord-bot ./packages/discord-bot/
COPY packages/utils ./packages/utils/
COPY packages/@types ./packages/@types/

# Set env vars
ARG GRAPHQL_HOST

ENV GRAPHQL_URL https://$GRAPHQL_HOST.onrender.com/v1/graphql
ENV HASURA_GRAPHQL_ADMIN_SECRET metagame_secret

# Build
RUN yarn discord-bot build

# Delete devDependencies
RUN yarn install --pure-lockfile --production --ignore-scripts --prefer-offline

# Create completely new stage including only necessary files
FROM node:16-slim as app
WORKDIR /app

# Needed at runtime
ENV RUNTIME_ENV docker

# Copy necessary files into the stage
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/packages/discord-bot/package.json ./packages/discord-bot/package.json
COPY --from=build /usr/src/app/packages/discord-bot/dist ./packages/discord-bot/dist

COPY --from=build /usr/src/app/packages/utils/package.json ./packages/utils/package.json
COPY --from=build /usr/src/app/packages/utils/dist ./packages/utils/dist
COPY --from=build /usr/src/app/packages/utils/node_modules ./packages/utils/node_modules

CMD [ "yarn", "discord-bot", "start" ]
