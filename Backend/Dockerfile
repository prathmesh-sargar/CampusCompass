# # FROM node:20-alpine

# # WORKDIR /app

# # # Copy only package files first (layer caching)
# # COPY package*.json ./

# # RUN npm ci --only=production

# # COPY . .

# # ENV NODE_ENV=production
# # EXPOSE 5000

# # HEALTHCHECK --interval=30s --timeout=3s \
# #   CMD wget -qO- http://localhost:5000/health || exit 1

# # CMD ["node", "index.js"]


# -----------------------------------------------


# FROM node:20-alpine

# # Install curl for healthcheck
# RUN apk add --no-cache curl

# # Set working directory
# WORKDIR /app

# # Copy dependency files first (cache optimization)
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps

# # Copy source code
# COPY . .

# # Expose backend port
# EXPOSE 4000

# # Docker health check
# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD curl -f http://localhost:5000/health || exit 1

# # Start backend
# CMD ["node", "index.js"]



# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# ---- runtime stage ----
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app

# remove dev dependencies
RUN npm prune --omit=dev

EXPOSE 4000
CMD ["node","index.js"]
