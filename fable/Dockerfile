FROM node:18-alpine
WORKDIR /usr/src/app
COPY node_modules node_modules
COPY dist dist
COPY .env .
COPY package.json .
EXPOSE 8000
CMD [ "node","dist/main.js" ]
