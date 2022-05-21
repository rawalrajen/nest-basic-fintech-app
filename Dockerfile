# STAGE: Development
FROM node:14-alpine AS dev

# Port to listen on
EXPOSE 3000

# Copy app and install packages
WORKDIR /app
COPY . /app/
COPY .env.docker /app/.env

RUN yarn

# Default app commands
CMD ["yarn", "start:dev"]