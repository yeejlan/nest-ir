FROM node:17-alpine3.12 As development

WORKDIR /app

COPY . .

RUN yarn run build

FROM node:17-alpine3.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]