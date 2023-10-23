FROM oven/bun:1.0-alpine as build

ARG SERVICE_NAME

WORKDIR /app
RUN mkdir -p /app/apps/$SERVICE_NAME

COPY package.json nx.json ./
RUN bun install

COPY tsconfig.base.json ./
COPY apps/$SERVICE_NAME ./apps/$SERVICE_NAME
COPY libs ./libs

RUN bun run build $SERVICE_NAME


FROM oven/bun:1.0-alpine as serve

ARG SERVICE_NAME

WORKDIR /app

COPY --from=builder /app/package.json /app/bun.lockb ./
RUN bun install --production --frozen-lockfile

COPY --from=builder /app/dist/apps/$SERVICE_NAME /app

CMD ["bun", "run", "main.mjs"]
