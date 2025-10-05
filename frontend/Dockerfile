# Estágio 1: Build da aplicação React
FROM node:18-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copia apenas o package.json primeiro
COPY package.json ./

# Usa npm install que é mais flexível que npm ci
RUN npm install --silent

# Agora copia o resto dos arquivos
COPY . ./

# Executa o build
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]