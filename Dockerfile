FROM node:18-alpine

ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}

# Create app directory
WORKDIR /usr/src/app

# where available (npm@5+)
COPY package.json .

COPY . .

RUN npm i
RUN npm -v

# Building app
RUN npm run build
# HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
# EXPOSE 80

CMD [ "npm", "run", "start" ]