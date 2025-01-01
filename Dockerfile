# --------
# Stage 1: Build the Angular app
# --------
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# --------
# Stage 2: Serve the app with Nginx
# --------
FROM nginx:alpine
COPY --from=builder /app/dist/hbackup/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
