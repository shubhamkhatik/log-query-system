# backend/Dockerfile
FROM node:21.7.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
