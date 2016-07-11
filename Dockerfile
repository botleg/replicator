FROM mhart/alpine-node:6

RUN apk add --update --no-cache nginx

ADD files/package.json files/server.js /code/
WORKDIR /code
RUN npm install

ADD files/nginx.conf /etc/nginx
ADD files/start.sh /bin/start.sh
RUN chmod +x /bin/start.sh

EXPOSE 443
ENTRYPOINT ["/bin/start.sh"]