# syntax=docker/dockerfile:1

# For this file to build, it needs to have a `$TARGET` specified.
# Either `production` or `development` to run either the built
# site or dev environment respectively.
ARG TARGET=production

FROM node:16-slim AS base
WORKDIR /usr/src/app

# Install dependencies not included in the slim image
RUN apt-get update && apt-get install -y --no-install-recommends g++ make python git ca-certificates

COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY schema.graphql ./
COPY tsconfig*.json ./
COPY .eslintrc.cjs ./
COPY packages/web/.eslintrc.cjs packages/web/
COPY packages/web/*.json packages/web/
COPY packages/web/codegen.ts packages/web/
COPY packages/web/graphql/ packages/web/graphql/
COPY packages/utils/*.json packages/utils/
COPY packages/design-system/*.json packages/design-system/

RUN yarn policies set-version 1.15.2
RUN yarn install --pure-lockfile

FROM base AS build

# Copy source files
COPY packages/web/ packages/web/
COPY packages/utils/ packages/utils/
COPY packages/design-system/ packages/design-system/
COPY packages/@types/ packages/@types/

# Set env vars
ARG NODE_ENV=production
ARG APP_ENV=$NODE_ENV
ARG GRAPHQL_HOST=hasura
ARG GRAPHQL_DOMAIN=onrender.com
ARG GRAPHQL_URL=https://$GRAPHQL_HOST.$GRAPHQL_DOMAIN/v1/graphql

ENV NEXT_PUBLIC_GRAPHQL_URL=$GRAPHQL_URL

ARG NEXT_PUBLIC_APP_ENV=$APP_ENV
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NEXT_PUBLIC_YOUTUBE_API_KEY
ARG NEXT_PUBLIC_GA4_ID
ARG NEXT_PUBLIC_HONEYBADGER_API_KEY
ARG NEXT_PUBLIC_USERBACK_TOKEN

# Build
FROM build AS build-production
ONBUILD RUN yarn web:build
# Delete devDependencies
ONBUILD RUN yarn install --pure-lockfile --production --ignore-scripts --prefer-offline

FROM build AS build-development
ONBUILD RUN yarn web:deps:build

FROM "build-$TARGET" as built

# Create completely new stage including only necessary files
FROM node:16-slim AS app
WORKDIR /app

# Copy necessary files into the stage
COPY --from=built /usr/src/app/package.json ./
COPY --from=built /usr/src/app/node_modules/ node_modules/

# Copy the built web app
FROM app AS copy-production
ONBUILD COPY --from=built /usr/src/app/packages/utils/package.json packages/utils/
ONBUILD COPY --from=built /usr/src/app/packages/utils/dist/ packages/utils/dist/
# ONBUILD COPY --from=built /usr/src/app/packages/utils/node_modules/ packages/utils/node_modules/
ONBUILD COPY --from=built /usr/src/app/packages/design-system/package.json packages/design-system/
ONBUILD COPY --from=built /usr/src/app/packages/design-system/dist/ packages/design-system/dist/
ONBUILD COPY --from=built /usr/src/app/packages/web/package.json packages/web/
ONBUILD COPY --from=built /usr/src/app/packages/web/public/ packages/web/public/
ONBUILD COPY --from=built /usr/src/app/packages/web/.next/ packages/web/.next/

ONBUILD CMD ["yarn", "web", "start"]

# Copy the sources
FROM app AS copy-development
ONBUILD COPY --from=built /usr/src/app/schema.graphql ./
ONBUILD COPY --from=built /usr/src/app/tsconfig*.json ./
ONBUILD COPY --from=built /usr/src/app/packages/design-system/ packages/design-system/
ONBUILD COPY --from=built /usr/src/app/packages/utils/ packages/utils/
ONBUILD COPY --from=built /usr/src/app/packages/web/ packages/web/

ONBUILD RUN rm -rf packages/web/.next/

ONBUILD CMD ["yarn", "web", "dev"]

FROM "copy-$TARGET" AS final

RUN echo "Generated ${TARGET} image for frontend."
