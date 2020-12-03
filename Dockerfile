FROM node:12
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app
RUN npm run build
CMD ["npm", "start:prod"]
