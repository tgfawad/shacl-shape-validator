# Dockerfile for the frontend
FROM node:20-alpine

LABEL maintainer="Fawad Khan <tgfawad@gmail.com>"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
