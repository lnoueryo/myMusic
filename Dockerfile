FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .
COPY ./.env.dev ./.env
RUN yarn install --frozen-lockfile

ENV NODE_ENV production

RUN yarn build
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]