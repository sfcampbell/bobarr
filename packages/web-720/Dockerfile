FROM node:14-alpine

RUN apk add curl git

ARG port 3001
ENV PORT 3001, port 3001
EXPOSE 3001

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./

RUN yarn --network-timeout 1000000
COPY . .

RUN yarn build

HEALTHCHECK --start-period=30s \
  CMD curl -s -f http://127.0.0.1:3001 || exit 1

CMD yarn start
