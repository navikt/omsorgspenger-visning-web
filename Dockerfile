FROM node:alpine
LABEL org.opencontainers.image.source=https://github.com/navikt/omsorgspenger-visning-web

WORKDIR /usr/src/app

COPY build ./build
COPY node_modules ./node_modules
COPY server.js .
COPY package.json .

EXPOSE 8090
CMD ["yarn", "start:prod"]
