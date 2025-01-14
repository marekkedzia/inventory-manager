FROM node:20.0-alpine3.18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY dist ./dist

RUN npm install

EXPOSE $PORT
CMD ["npm", "run", "start"]
