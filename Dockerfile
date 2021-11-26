FROM node:lts-alpine as build-stage
# Backend URL
ENV VUE_APP_SOCKET_IO_URL http://localhost:3000
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM httpd:2.4
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/
EXPOSE 80