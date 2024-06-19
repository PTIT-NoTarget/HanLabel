# Stage 1 - the build process
FROM node:14-alpine as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
ARG REACT_APP_ENV
RUN if [ "$REACT_APP_ENV" = "cicd" ]; then npm run build:cicd; else npm run build; fi

# Stage 2 - the production environment
FROM nginx:1.17.8-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]