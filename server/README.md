<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

NestJS CRUD Sample

- use Typeorm RowQuery Version

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Typeorm synchronize Option

Entity를 기준으로 DB Table을 새로 생성하는 옵션이므로 서버 처음 실행 시만 true

- Path: `src/config/orm/ormconfig.ts`

## typeorm-model-generator

기존 DB로부터 모델을 자동으로 생성

```bash
$ typeorm-model-generator -h <host> -d <DB이름> -p [port] -u <user> -x [password] -e [engine] -o ./entities
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Commit Convention

- `@commitlint/config-conventional`

```
feat: 새로운 기능
  emoji: ✨

fix: 버그 수정
  emoji: 🐛

docs: 문서만 변경
  emoji: 📚

style: 코드의 의미에 영향을 주지 않는 변경 사항(공백, 서식 지정, 세미콜론 누락 등)
  emoji: 💎

refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경
  emoji: 📦

perf: 성능을 향상시키는 코드 변경
  emoji: 🚀

test: 누락된 테스트 추가 또는 기존 테스트 수정
  emoji: 🚨

build: 빌드 시스템 또는 외부 종속성에 영향을 주는 변경 사항(예: gulp, broccoli, npm)
  emoji: 🛠

ci: CI 구성 파일 및 스크립트 변경(예시 범위: Travis, Circle, BrowserStack, SauceLabs)
  emoji: ⚙️

chore: src 또는 테스트 파일을 수정하지 않는 기타 변경 사항
  emoji: ♻️

revert: 이전 커밋을 되돌립니다.
  emoji: 🗑
```
