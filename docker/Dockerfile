FROM node:15.0.1-alpine3.10
WORKDIR /app
RUN mkdir migrations
COPY package.json yarn.lock ./
RUN apk update && \
    apk add git
RUN yarn install

# expects pg-diff-config.json mounted in /app/pg-diff-config.json
# expects migrations mounted in /app/migrations/

CMD yarn pg-diff-file -c development initial_diff