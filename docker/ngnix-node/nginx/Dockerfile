FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /var/www/html -p && touch /var/www/html/index.html
RUN echo "<h1>Carregando...</h1><script>setTimeout(function () {location.reload()}, 1000)</script>" >> /usr/share/nginx/html/custom_50x.html

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]