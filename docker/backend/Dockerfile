FROM node:12 as base
WORKDIR /usr/src/app

# Install dependencies for dev and prod
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.base.json .
COPY packages/backend/*.json ./packages/backend/
COPY packages/utils/*.json ./packages/utils/

RUN yarn install --pure-lockfile


# Dev environment doesn't run this stage or beyond
FROM base as build

# Copy source files
COPY packages/backend ./packages/backend/
COPY packages/utils ./packages/utils/
COPY packages/@types ./packages/@types/

# Build
RUN yarn --cwd ./packages/utils/ build
RUN yarn --cwd ./packages/backend/ build

CMD [ "yarn", "start:backend" ]
