# Estágio 1: Instalação das dependências
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Estágio 2: Criação da imagem final
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["npm", "start"]