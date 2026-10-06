FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

ENV PORT=4000
EXPOSE 4000

USER node

CMD ["node", "app.js"]
 