# frontend/Dockerfile
FROM node:21.7.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve production build with Vite preview
EXPOSE 4173
CMD ["npm", "run", "preview"]
