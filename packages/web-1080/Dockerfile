FROM node:14-alpine

RUN apk add curl

EXPOSE $PORT

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
CMD curl -s https://raw.githubusercontent.com/sfcampbell/bobarr/redo/assets/web_mod.sh -o web_mod.sh && \
chmod +x ./web_mod.sh

RUN yarn --network-timeout 1000000
COPY . .

RUN yarn build

HEALTHCHECK --start-period=30s \
  CMD curl -s -f http://127.0.0.1:$PORT || exit 1

CMD /usr/src/app/web_mod.sh
CMD yarn start
