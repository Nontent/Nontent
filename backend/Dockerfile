FROM node

RUN mkdir /backend

WORKDIR /backend/src

COPY src/package.json /backend

RUN npm install

COPY . /backend

CMD ["cd", "src/", "&&", "npm", "start"]

EXPOSE 3000