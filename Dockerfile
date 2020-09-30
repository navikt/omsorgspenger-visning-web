FROM node:alpine

WORKDIR /usr/src/app

COPY build ./build
COPY node_modules ./node_modules
COPY server.js .
COPY package.json .

EXPOSE 8090
CMD ["yarn", "start:prod"]
