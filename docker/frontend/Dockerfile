FROM node:14 as base
WORKDIR /usr/src/app

ARG GRAPHQL_HOST
ARG GRAPHQL_DOMAIN=onrender.com

ENV NEXT_PUBLIC_GRAPHQL_URL https://$GRAPHQL_HOST.$GRAPHQL_DOMAIN/v1/graphql

# Install dependencies for dev and prod
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY schema.graphql .
COPY tsconfig.base.json .
COPY tsconfig.json .
COPY packages/web/*.json ./packages/web/
COPY packages/web/codegen.yml ./packages/web/
COPY packages/web/graphql ./packages/web/graphql/
COPY packages/utils/*.json ./packages/utils/
COPY packages/design-system/*.json ./packages/design-system/

RUN yarn policies set-version 1.15.2
RUN yarn install --pure-lockfile

# Dev environment doesn't run this stage or beyond
FROM base as build

# Copy source files
COPY packages/web ./packages/web/
COPY packages/utils ./packages/utils/
COPY packages/design-system ./packages/design-system/
COPY packages/@types ./packages/@types/

# Build
RUN yarn web:build

CMD [ "yarn", "web", "start" ]
