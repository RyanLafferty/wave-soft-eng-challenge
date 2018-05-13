FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | /bin/bash && apt-get install -y nodejs

WORKDIR /ui-server
COPY package.json ./
RUN npm install
RUN npm install nodemon -g

ADD . .

EXPOSE 3000
CMD ["nodemon", "start"]