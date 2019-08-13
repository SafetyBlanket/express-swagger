# Production Dockerfile 
# Staging
FROM node:12 as Staging

# Environment
ENV NODE_ENV development

# App setup
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# Final build
FROM node:12-alpine

# Environment
ENV NODE_ENV production

# App setup
WORKDIR /usr/src/app
COPY --from=Staging /usr/src/app/dist .

# And away we go...
EXPOSE 3000
CMD node index.js
