FROM node:16-alpine

WORKDIR /usr/src/app

COPY podlet/package*.json ./
COPY podlet/yarn.lock*.json ./

RUN yarn --cwd podlet install

COPY podlet .

EXPOSE 7100

CMD [ "node", "podlet.js" ]