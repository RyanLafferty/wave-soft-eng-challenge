FROM mariadb:10.3
LABEL maintainer="RyanLafferty"

# Setup the environment
ENV DATABASE_USER root
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE payroll

# Add data to entrypoint
COPY data/* /docker-entrypoint-initdb.d/

# Start database
EXPOSE 3306
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]