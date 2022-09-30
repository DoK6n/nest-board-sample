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
build: 빌드 시스템 또는 외부 종속성에 영향을 미치는 변경 사항이 있을 때

chore: 빌드 업무 수정, 패키지 매니저 수정

ci: CI 구성 파일 및 스크립트의 변경 사항이 있을 때

docs: 단순 문서 수정이 있을 때

feat: 새로운 기능 추가가 있을 때

fix: 버그 수정이 있을 때

perf: 성능 개선이 있는 변경이 있을 때

refactor: 버그 수정, 기능 추가, 성능 개선을 제외한 변경이 있을 때

revert: 이전 커밋으로 회귀할 때

style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

test: 테스트 관련 변경이 있을 때

```
