# Base com Node.js para desenvolvimento
FROM node:18-alpine AS base

# Configuração do diretório de trabalho
WORKDIR /app/backend

# Copiar arquivos de dependências do backend
COPY ./backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do backend
COPY ./backend ./

# Expor a porta do Nest.js (configurada no app)
EXPOSE 3000

# Comando para rodar em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]
