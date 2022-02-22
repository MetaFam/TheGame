# syntax = docker/dockerfile:1 # use BuildKit

FROM node:16-slim as base
WORKDIR /usr/src/app

# Install dependencies not included in the slim image
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
                       g++ make python \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies for dev and prod in order of likelihood to change
COPY tsconfig.base.json .
COPY lerna.json .
COPY schema.graphql .
COPY packages/discord-bot/*.json ./packages/discord-bot/
COPY packages/utils/*.json ./packages/utils/
COPY package.json .
COPY yarn.lock .
COPY packages/backend/*.json ./packages/backend/

RUN ["yarn", "install", "--pure-lockfile"]

# Dev environment doesn't run this stage or beyond
FROM base as build

# Set env vars
ARG GRAPHQL_HOST=hasura
ARG GRAPHQL_DOMAIN=onrender.com
ARG GRAPHQL_URL=https://$GRAPHQL_HOST.$GRAPHQL_DOMAIN/v1/graphql

ENV GRAPHQL_URL="$GRAPHQL_URL"
ENV HASURA_GRAPHQL_ADMIN_SECRET=metagame_secret
ENV CERAMIC_URL=https://ceramic.metagame.wtf

# Copy source files
COPY packages/@types ./packages/@types/
COPY packages/discord-bot ./packages/discord-bot/
COPY packages/utils ./packages/utils/
COPY packages/backend ./packages/backend/

# Build
RUN ["yarn", "backend:build"]

# Delete devDependencies
RUN ["yarn", "install", "--pure-lockfile", \
     "--production", "--ignore-scripts", \
     "--prefer-offline"]

# Create completely new stage including only necessary files
FROM node:16-alpine as app
WORKDIR /app

# Copy necessary files into the stage
COPY --from=build /usr/src/app/packages/discord-bot/package.json \
                  ./packages/discord-bot/package.json
COPY --from=build /usr/src/app/packages/discord-bot/dist \
                  ./packages/discord-bot/dist

COPY --from=build /usr/src/app/packages/utils/package.json \
                  ./packages/utils/package.json
COPY --from=build /usr/src/app/packages/utils/dist \
                  ./packages/utils/dist
COPY --from=build /usr/src/app/packages/utils/node_modules \
                  ./packages/utils/node_modules

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/packages/backend/package.json \
                  ./packages/backend/package.json
COPY --from=build /usr/src/app/packages/backend/dist \
                  ./packages/backend/dist

CMD ["yarn", "backend", "start"]
