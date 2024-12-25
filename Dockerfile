FROM node:16.19.1-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

# COPY .env /usr/src/app/
COPY . /usr/src/app
RUN npm run build

ENV PORT 5000
EXPOSE 5000
CMD [ "node", "dist/main.js" ]
