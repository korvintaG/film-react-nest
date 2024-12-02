FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . /app/
RUN npm run build

FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist
COPY /public ./public
EXPOSE 3000
CMD [ "sh", "-c", "node ./dist/main.js" ]

