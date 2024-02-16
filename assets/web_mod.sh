#!/bin/sh

## Replace next-start config file
(
  cd /usr/src/app/node_modules/next/dist/cli/ && \
  mv next-start.js next-start.js.orig && \
  curl -s https://raw.githubusercontent.com/sfcampbell/bobarr/redo/assets/next-start.js -o next-start.js
)
