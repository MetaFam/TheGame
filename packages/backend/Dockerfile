FROM node:12

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json lerna.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/utils/package*.json ./packages/utils/

RUN yarn install

COPY tsconfig.json ./
COPY packages/backend ./packages/backend
COPY packages/utils ./packages/utils

RUN ls node_modules/@types
RUN ls node_modules/uuid
RUN ls packages/utils/node_modules/@types
RUN yarn build

CMD [ "yarn", "start:backend" ]
