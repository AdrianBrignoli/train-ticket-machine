# Build stage
FROM node:18-alpine as build-stage

# Set working directory
WORKDIR /app

# Create .env file with production values
ARG VITE_STATSIG_SDK_KEY
RUN echo "VITE_STATSIG_SDK_KEY=${VITE_STATSIG_SDK_KEY}" > .env

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:1.24.0-alpine as production-stage

# Add security headers
RUN echo "add_header X-Frame-Options 'DENY';" >> /etc/nginx/conf.d/default.conf && \
    echo "add_header X-Content-Type-Options 'nosniff';" >> /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration (we'll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 
