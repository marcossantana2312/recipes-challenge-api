FROM node:12
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
