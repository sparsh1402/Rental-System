# Stage 1: build the React app. REACT_APP_API_URL is left empty so the SPA makes
# same-origin requests that nginx proxies to the gateway.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV REACT_APP_API_URL=""
RUN npm run build

# Stage 2: serve the static build with nginx.
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
