# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# Copiamos la carpeta de prisma antes de instalar
COPY prisma ./prisma/ 

RUN npm install
COPY . .

# Generar el cliente de Prisma (necesario para el build)
RUN npx prisma generate
RUN npm run build

# Etapa 2: Ejecución
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# Copiamos la carpeta prisma para tener acceso a las migraciones
COPY --from=builder /app/prisma ./prisma 

EXPOSE 3000

# Usamos un script de inicio
CMD ["npx", "prisma", "migrate", "deploy", "&&", "node", "dist/main"]