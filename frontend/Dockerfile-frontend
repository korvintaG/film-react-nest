FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json /app/
COPY tsconfig*.json /app/
RUN npm i
COPY . /app/
CMD [ "sh", "-c", "npm run build" ]
