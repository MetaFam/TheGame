FROM node:12 as base
WORKDIR /usr/src/app

ARG GRAPHQL_HOST

ENV GRAPHQL_URL https://$GRAPHQL_HOST.onrender.com/v1/graphql
ENV HASURA_GRAPHQL_ADMIN_SECRET metagame_secret

# Install dependencies for dev and prod
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.base.json .
COPY packages/backend/*.json ./packages/backend/
COPY packages/utils/*.json ./packages/utils/
COPY packages/codegen/*.json ./packages/codegen/

RUN yarn install --pure-lockfile

# Dev environment doesn't run this stage or beyond
FROM base as build

# Copy source files
COPY packages/backend ./packages/backend/
COPY packages/utils ./packages/utils/
COPY packages/@types ./packages/@types/
COPY packages/codegen ./packages/codegen/

# Build
RUN yarn backend:build

CMD [ "yarn", "backend", "start" ]
