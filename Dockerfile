FROM node:12
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV TZ=America/Bogota

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8300

CMD [ "npm", "start" ]