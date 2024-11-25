# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração primeiro
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o código fonte
COPY . .

# Gerar build
RUN npm run build

# Stage de produção
FROM nginx:alpine

# Copiar build gerado pelo Vite para o diretório do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Configurar o nginx para servir os arquivos estáticos
CMD ["nginx", "-g", "daemon off;"]