FROM node:14-alpine

RUN apk add curl

ENV PORT 4001
EXPOSE 4001

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./

RUN yarn --network-timeout 1000000
COPY . .

RUN yarn build

HEALTHCHECK --start-period=30s \
  CMD curl -s -f http://127.0.0.1:4001/health || exit 1

CMD yarn start:prod
