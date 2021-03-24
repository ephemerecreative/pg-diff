FROM node:15.0.1-alpine3.10
WORKDIR /app
COPY package.json yarn.lock entrypoint.js pgClients.js pg-diff-config.json ./
RUN apk update && \
    apk add git
RUN yarn install
ENTRYPOINT ["yarn", "migrations"]