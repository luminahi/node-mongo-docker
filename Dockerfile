FROM node:19-alpine
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm ci --omit=dev && npm cache clean --force
COPY ./ /app/
CMD ["node", "index.js"]
EXPOSE 3000
