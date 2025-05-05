FROM node:22-alpine AS build

LABEL org.opencontainers.image.source=https://github.com/ionaru/deals

ARG SERVICE_NAME

WORKDIR /app
RUN mkdir -p /app/apps/"$SERVICE_NAME"

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.base.json ./
RUN echo "{}" > nx.json
COPY apps/$SERVICE_NAME ./apps/$SERVICE_NAME
COPY libs ./libs
COPY modules ./modules

RUN npm run build "$SERVICE_NAME"


FROM node:22-alpine AS serve

ARG SERVICE_NAME

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/apps/$SERVICE_NAME /app

CMD ["node", "main.mjs"]
