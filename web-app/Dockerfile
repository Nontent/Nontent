FROM node

RUN mkdir /web-app

WORKDIR /web-app

COPY package.json /web-app

RUN npm install

COPY . /web-app

CMD ["npm", "start"]

EXPOSE 3000