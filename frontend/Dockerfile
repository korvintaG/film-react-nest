FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19-alpine AS production
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/sites-available/korvintag.nomorepartiesco.ru
COPY nginx-api.conf /etc/nginx/sites-available/api.korvintag.nomorepartiesco.ru
COPY --from=builder /app/dist /opt/site/
