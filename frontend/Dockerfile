# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

# Define variáveis de ambiente para configurar a URL da API e a chave da API do Google
# Essas variáveis podem ser passadas ao construir a imagem
ARG VITE_API_URL
ARG VITE_GOOGLE_API_KEY

# Atribui as variáveis de ambiente com os valores passados durante o build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY

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