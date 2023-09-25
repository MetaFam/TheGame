# syntax=docker/dockerfile:1

# This is not intended to be used for local development!

# For this file to build, it needs to have a `$TARGET` specified.
# Either `production` or `development` to run either the built
# site or dev environment respectively.
ARG TARGET=production

FROM node:16-slim AS base
WORKDIR /usr/src/app

# Install dependencies not included in the slim image
RUN apt-get update && apt-get install -y --no-install-recommends g++ make python git ca-certificates

# Install dependencies for dev and prod
COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY schema.graphql ./
COPY tsconfig.*json ./
COPY .eslintrc.cjs ./
COPY packages/web/*.json ./packages/web/
COPY packages/web/codegen.ts ./packages/web/
COPY packages/web/graphql ./packages/web/graphql/
COPY packages/utils/*.json ./packages/utils/
COPY packages/design-system/*.json ./packages/design-system/

RUN yarn policies set-version 1.15.2
RUN yarn install --pure-lockfile

FROM base AS build

# Copy source files
COPY packages/web/ packages/web/
COPY packages/utils/ packages/utils/
COPY packages/design-system/ packages/design-system/
COPY packages/@types/ packages/@types/

# Build
FROM build AS build-production

# Each ENV below must have an ARG as well to be available at runtime
ARG APP_ENV
ARG GRAPHQL_URL https://api.metagame.wtf/v1/graphql
ARG FRONTEND_URL https://metagame.wtf
ARG IMGIX_TOKEN
ARG YOUTUBE_API_KEY
ARG PAYMASTER_URL
ARG BUNDLER_URL
ARG HONEYBADGER_API_KEY
ARG USERBACK_TOKEN
ARG CERAMIC_URL https://ceramic.metagame.wtf
ARG WEB3_STORAGE_TOKEN
ARG OPENSEA_API_KEY

# ARGs are not available at runtime, so define ENV variables
# These ENVs should match the --set-env-vars in `.github/workflows/gcp-deploy.yaml`
# see https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/
ENV NEXT_PUBLIC_APP_ENV $APP_ENV
ENV NEXT_PUBLIC_GRAPHQL_URL $GRAPHQL_URL
ENV NEXT_PUBLIC_FRONTEND_URL $FRONTEND_URL
ENV NEXT_PUBLIC_IMGIX_TOKEN $IMGIX_TOKEN
ENV NEXT_PUBLIC_YOUTUBE_API_KEY $YOUTUBE_API_KEY
ENV NEXT_PUBLIC_HONEYBADGER_API_KEY $HONEYBADGER_API_KEY
ENV NEXT_PUBLIC_USERBACK_TOKEN $USERBACK_TOKEN
ENV NEXT_PUBLIC_PAYMASTER_URL $PAYMASTER_URL
ENV NEXT_PUBLIC_BUNDLER_URL $BUNDLER_URL
ENV NEXT_PUBLIC_CERAMIC_URL $CERAMIC_URL
# These are not exposed to the browser
ENV WEB3_STORAGE_TOKEN $WEB3_STORAGE_TOKEN
ENV OPENSEA_API_KEY $OPENSEA_API_KEY

ONBUILD RUN yarn web:build
# Delete devDependencies
ONBUILD RUN yarn install --pure-lockfile --production --ignore-scripts --prefer-offline

FROM build AS build-development
ONBUILD RUN yarn web:deps:build

FROM "build-$TARGET" as built

# New stage including only necessary files
FROM node:16-slim AS app
WORKDIR /app

# Copy necessary files into the stage
COPY --from=built /usr/src/app/package.json ./
COPY --from=built /usr/src/app/node_modules/ node_modules/

# Copy the built web app
FROM app AS copy-production
ONBUILD COPY --from=built /usr/src/app/packages/utils/package.json packages/utils/
ONBUILD COPY --from=built /usr/src/app/packages/utils/dist/ packages/utils/dist/
ONBUILD COPY --from=built /usr/src/app/packages/design-system/package.json packages/design-system/
ONBUILD COPY --from=built /usr/src/app/packages/design-system/dist/ packages/design-system/dist/
ONBUILD COPY --from=built /usr/src/app/packages/web/package.json packages/web/
ONBUILD COPY --from=built /usr/src/app/packages/web/node_modules/ packages/web/node_modules/
ONBUILD COPY --from=built /usr/src/app/packages/web/public/ packages/web/public/
ONBUILD COPY --from=built /usr/src/app/packages/web/.next/ packages/web/.next/

ONBUILD CMD ["yarn", "web", "start"]

# Copy the sources
FROM app AS copy-development
ONBUILD COPY --from=built /usr/src/app/schema.graphql ./
ONBUILD COPY --from=built /usr/src/app/tsconfig*.json ./
ONBUILD COPY --from=built /usr/src/app/lerna.json ./
ONBUILD COPY --from=built /usr/src/app/packages/design-system/ packages/design-system/
ONBUILD COPY --from=built /usr/src/app/packages/utils/ packages/utils/
ONBUILD COPY --from=built /usr/src/app/packages/web/ packages/web/

ONBUILD RUN rm -rf packages/design-system/dist/
ONBUILD RUN rm -rf packages/web/.next/

ONBUILD CMD ["yarn", "web:dev"]

FROM "copy-$TARGET" AS final

RUN echo "Generated $TARGET image for frontend."
