# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package*.json .
RUN npm i

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:alpine as production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80
EXPOSE 443
# Start nginx
CMD ["nginx", "-g", "daemon off;"]