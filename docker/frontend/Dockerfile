FROM node:14-slim as base
WORKDIR /usr/src/app

ARG GRAPHQL_HOST
ARG GRAPHQL_DOMAIN=onrender.com

ENV NEXT_PUBLIC_GRAPHQL_URL https://$GRAPHQL_HOST.$GRAPHQL_DOMAIN/v1/graphql

# Install dependencies not included in the slim image
RUN apt-get update && apt-get install -y --no-install-recommends g++ make python git ca-certificates

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

# Create completely new stage including only necessary files
FROM node:14-alpine as app
WORKDIR /app

# Copy necessary files into the stage
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/packages/web/package.json ./packages/web/package.json
COPY --from=build /usr/src/app/packages/web/public ./packages/web/public
COPY --from=build /usr/src/app/packages/web/.next ./packages/web/.next

COPY --from=build /usr/src/app/packages/utils/package.json ./packages/utils/package.json
COPY --from=build /usr/src/app/packages/utils/dist ./packages/utils/dist
COPY --from=build /usr/src/app/packages/utils/node_modules ./packages/utils/node_modules

COPY --from=build /usr/src/app/packages/design-system/package.json ./packages/design-system/package.json
COPY --from=build /usr/src/app/packages/design-system/dist ./packages/design-system/dist

CMD [ "yarn", "web", "start" ]
