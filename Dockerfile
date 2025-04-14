FROM node:22-alpine

# Zmniejsz rozmiar obrazu i przyspiesz instalację zależności
ENV NODE_ENV=development

WORKDIR /app

# Kopiuj tylko to, co potrzebne do zainstalowania zależności
COPY package.json package-lock.json* ./

# Zainstaluj zależności bez zbędnych dodatków
RUN npm install --legacy-peer-deps

# Dopiero teraz kopiuj resztę (lepsze cacheowanie)
COPY . .

# Generuj klienta Prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
