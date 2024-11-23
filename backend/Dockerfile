# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependências e CLI do NestJS
RUN npm ci && \
    npm i -g @nestjs/cli

# Copiar código fonte
COPY src/ ./src/

# Gerar build
RUN npm run build

# Production Stage
FROM node:18-alpine AS production

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar build
COPY --from=builder /app/dist/ ./dist/

# Expor porta
EXPOSE 8080

# Comando para produção
CMD ["node", "dist/main"]