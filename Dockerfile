# Use the official Bun image for linux/amd64
FROM --platform=linux/amd64 oven/bun:1.1.17 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /node_modules
COPY . .
# COPY .env.production ./.env

# [Optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules /node_modules
COPY --from=prerelease /usr/src/app/.next ./.next
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/next.config.js .
# COPY --from=prerelease /usr/src/app/.env .env

# Ensure the app has the correct permissions
RUN chown -R bun:bun /usr/src/app /node_modules

# Run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]