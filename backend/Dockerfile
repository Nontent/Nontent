FROM node

RUN mkdir /backend

WORKDIR /backend/src

COPY src/package.json /backend

RUN npm install

COPY . /backend

CMD ["npm", "start"]

EXPOSE 3000