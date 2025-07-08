FROM node:22-alpine AS build

LABEL org.opencontainers.image.source=https://github.com/ionaru/deals

WORKDIR /app

COPY package.json package-lock.json ./
COPY tools/patch-apollo.js ./tools/
RUN npm ci

COPY tsconfig.base.json ./
RUN echo "{}" > nx.json
COPY apps/client ./apps/client
COPY libs ./libs

RUN npm run build client -- -- --localize


FROM nginx:mainline-alpine AS serve

COPY deploy/nginx.conf /etc/nginx/conf.d
RUN mkdir /etc/nginx/conf.d/proxy
COPY deploy/nginx-proxy.conf /etc/nginx/conf.d/proxy
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/apps/client /app
RUN ln -s en-US/assets app/browser/assets
