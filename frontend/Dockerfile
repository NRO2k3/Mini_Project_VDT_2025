FROM nginx:alpine

COPY build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ssl/ /etc/ssl/private/
