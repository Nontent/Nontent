FROM node

RUN mkdir /web-app

WORKDIR /web-app

COPY package.json /web-app

RUN npm install

COPY . /web-app

CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000