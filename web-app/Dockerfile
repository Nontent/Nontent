FROM node:alpine3.16

RUN mkdir /web-app

WORKDIR /web-app

COPY package.json /web-app

RUN npm install

COPY . /web-app

CMD ["npm", "start"]