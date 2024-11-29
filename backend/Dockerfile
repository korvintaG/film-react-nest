FROM node:20-alpine AS builder
WORKDIR /app
RUN chmod -R 777 /app/
COPY package*.json /app/
COPY tsconfig*.json /app/
RUN npm i
COPY . /app/
RUN npm run build

FROM node:20-alpine
# создание директории приложения
WORKDIR /usr/src/app
COPY package*.json ./

# Флаг --omit=dev означает «не ставить devDependencies»
# они не нужны в продакшен-окружении
RUN npm i --omit=dev

COPY --from=builder /app/dist ./dist
COPY /public ./public

EXPOSE 3000
CMD [ "sh", "-c", "node ./dist/main.js > /usr/src/app/logs/backend.log 2>&1" ]

