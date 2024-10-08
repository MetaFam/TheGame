FROM node:20-slim AS base
WORKDIR /usr/src/app

# varying arg to prevent caching
# ARG CACHEBUST

# Install dependencies not included in the slim image
RUN apt-get update && \
    apt-get install -y --no-install-recommends g++ make python3 git openssl && \
    apt-get install -y --no-install-recommends --reinstall ca-certificates

COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY schema.graphql ./
COPY tsconfig.base.json ./
COPY packages/backend/*.json ./packages/backend/
COPY packages/utils/*.json ./packages/utils/
COPY packages/discord-bot/*.json ./packages/discord-bot/
# Not needed for the backend, but the --immutable flag fails w/o them
COPY packages/design-system/package.json ./packages/design-system/
COPY packages/web/package.json ./packages/web/

RUN corepack enable
RUN yarn config set nodeLinker node-modules
RUN yarn install --immutable

# RUN set -x && echo $CACHEBUST && ls -la

# Dev environment doesn't run beyond here
FROM base AS build

# Copy source files
COPY packages/backend/ ./packages/backend/
COPY packages/utils/ ./packages/utils/
COPY packages/discord-bot/ ./packages/discord-bot/
COPY packages/@types/ ./packages/@types/

ARG GRAPHQL_HOST
ARG GRAPHQL_DOMAIN
ARG GRAPHQL_URL
ARG THE_GRAPH_API_TOKEN

ENV GRAPHQL_URL=$GRAPHQL_URL
ENV HASURA_GRAPHQL_ADMIN_SECRET=metagame_secret
ENV THE_GRAPH_API_TOKEN=$THE_GRAPH_API_TOKEN

# Build
RUN yarn backend:build

# Delete devDependencies
#RUN corepack enable
# RUN yarn workspaces focus @metafam/backend --production # --immutable
# RUN yarn install --immutable
# RUN yarn install --pure-lockfile --production --ignore-scripts --prefer-offline

# Create completely new stage including only necessary files
FROM node:20-slim AS app
WORKDIR /app

ARG CACHEBUST

# Copy necessary files into the stage
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/package.json ./
#COPY --from=build /usr/src/app/node_modules ./

COPY --from=build /usr/src/app/packages/backend/package.json ./packages/backend/
COPY --from=build /usr/src/app/packages/backend/dist/ ./packages/backend/dist/
#COPY --from=build /usr/src/app/packages/backend/node_modules ./packages/backend/
# RUN mkdir -p ./packages/backend/node_modules 

COPY --from=build /usr/src/app/packages/utils/package.json ./packages/utils/
COPY --from=build /usr/src/app/packages/utils/dist/ ./packages/utils/dist/
#COPY --from=build /usr/src/app/packages/utils/node_modules ./packages/utils/

COPY --from=build /usr/src/app/packages/discord-bot/package.json ./packages/discord-bot/
COPY --from=build /usr/src/app/packages/discord-bot/dist/ ./packages/discord-bot/dist/

RUN corepack enable 
RUN yarn config set nodeLinker node-modules
RUN yarn workspaces focus @metafam/backend --production # --immutable
RUN yarn cache clean

RUN echo $CACHEBUST && ls -la packages/*/


CMD ["yarn", "workspace", "@metafam/backend", "start"]
