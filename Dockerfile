FROM node:15.0.1-alpine3.10
WORKDIR /app
COPY . .
RUN apk update && \
    apk add git
RUN yarn install
ENTRYPOINT ["yarn", "migrations"]