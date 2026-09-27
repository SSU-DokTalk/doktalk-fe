FROM node:lts AS build
WORKDIR /app
# 의존성 목록을 먼저 복사해서, 코드만 바뀐 빌드는 설치 단계를 캐시로 건너뛰어요.
# yarn.lock에 적힌 버전 그대로 설치하고, package.json과 맞지 않으면 빌드를 멈춰요.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
