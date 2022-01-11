FROM node:16.13.1-alpine AS base
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn install --production --frozen-lockfile
RUN mv node_modules prod_node_modules
RUN yarn install --frozen-lockfile


# ---- Build ----
FROM dependencies AS build
COPY . .
RUN yarn build


# ---- Test ----
FROM dependencies AS test
COPY . .
CMD ["yarn", "test"]


# ---- Release ----
FROM base AS release
COPY --from=dependencies /usr/src/app/prod_node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/build /usr/src/app/build
ENV NODE_ENV production
EXPOSE ${PORT}

CMD ["node", "--enable-source-maps", "./build/index"]
