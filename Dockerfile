FROM node:lts AS BUILDER

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM node:lts as RUNNER

RUN  apt-get update \
    && apt-get install -y wget gnupg ca-certificates procps libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
    && chmod +x /usr/sbin/wait-for-it.sh

WORKDIR /app

COPY package.json .

COPY public ./public/

COPY next.config.js .

COPY --from=BUILDER /app/.next ./.next/

EXPOSE 3000

RUN yarn

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000

CMD yarn start
