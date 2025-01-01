
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN cat /app/dist/config/rabbitmq.js  # Debug: print the file content
CMD ["npm","start"]
EXPOSE 4003
