FROM --platform=$TARGETPLATFORM nginx
COPY public /usr/share/nginx/html
