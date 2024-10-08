FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Use the exact path to copy templates
COPY src/email/templates /app/dist/email/templates

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
