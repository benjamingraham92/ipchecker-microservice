FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /usr/src/app/logs

EXPOSE 8080
CMD [ "node", "src/app.js" ]