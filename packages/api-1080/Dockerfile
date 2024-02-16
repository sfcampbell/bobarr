FROM node:14-alpine

RUN apk add curl

ARG port $PORT
EXPOSE $PORT

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
CMD curl -s https://raw.githubusercontent.com/sfcampbell/bobarr/redo/assets/api_mod.sh -o api_mod.sh && \
chmod +x ./api_mod.sh

RUN yarn --network-timeout 1000000
COPY . .

RUN yarn build

HEALTHCHECK --start-period=30s \
  CMD curl -s -f http://127.0.0.1:$PORT/health || exit 1

CMD /usr/src/app/api_mod.sh
CMD yarn start:prod
