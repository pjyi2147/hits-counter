# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the project
RUN npm run build

# Production stage
FROM node:22-alpine AS prod

WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Command to run the application
CMD ["node", ".output/server/index.mjs"]
