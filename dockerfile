# Build‑Stage:
FROM node:18-alpine AS builder
ARG APP_DIR=/usr/src/app
WORKDIR $APP_DIR
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime‑Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/out/ ./

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
