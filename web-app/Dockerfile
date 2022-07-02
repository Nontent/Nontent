FROM node:8.16-alpine

WORKDIR /web-app

COPY . .

RUN npm install

RUN npm run build

RUN npm run start