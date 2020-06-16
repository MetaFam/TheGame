FROM node:12

WORKDIR /usr/src/app

# Install production dependencies
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.base.json .
COPY packages/backend/*.json ./packages/backend/
COPY packages/utils/*.json ./packages/utils/

# Install all dependencies
RUN yarn install --pure-lockfile

# Copy source files
COPY packages/backend ./packages/backend/
COPY packages/utils ./packages/utils/
COPY packages/@types ./packages/@types/

# Build
RUN yarn --cwd ./packages/utils/ build
RUN yarn --cwd ./packages/backend/ build

CMD [ "yarn", "start:backend" ]
