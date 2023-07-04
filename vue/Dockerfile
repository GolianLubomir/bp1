# Základný obraz - Node.js
FROM node:lts-alpine AS build-stage

# Nastavenie pracovného adresára v kontajneri
WORKDIR /app

# Kopírovanie package.json a package-lock.json (ak existuje)
COPY package*.json ./

# Inštalácia závislostí
RUN npm install

# Kopírovanie zdrojových kódov projektu do kontajnera
COPY . .

# Sestavenie aplikácie pre produkciu
RUN npm run build

# Spustenie servera
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
