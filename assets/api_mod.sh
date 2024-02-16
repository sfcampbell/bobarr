#!/bin/sh

## Replace Transmission config files
(
  cd /usr/src/app/node_modules/transmission-client/lib/ && \
  mv transmission.js transmission.js.orig && \
  curl -s https://raw.githubusercontent.com/sfcampbell/bobarr/redo/assets/transmission.js -o transmission.js  
)

(
  cd /usr/src/app/node_modules/transmission-client/src/ && \
  mv transmission.ts transmission.ts.orig && \
  curl -s https://raw.githubusercontent.com/sfcampbell/bobarr/redo/assets/transmission.ts -o transmission.ts
)