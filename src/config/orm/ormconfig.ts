import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { enableTypeORMLoggingOptionsPerEnvironment } from '../ormLoggerOption';
// import { Users, UsersDetail } from '../../Users/entities';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class OrmConfigService implements TypeOrmOptionsFactory {
//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     console.log(
//       path.resolve(__dirname, '..', '..').concat(process.env.TYPEORM_MIGRATIONS_DIR).split(' '),
//     );

//     return {
//       type: 'mysql',
//       name: process.env.TYPEORM_NAME || 'default',
//       username: process.env.TYPEORM_USERNAME || 'root',
//       password: process.env.TYPEORM_PASSWORD || '',
//       port: +process.env.TYPEORM_PORT || 3306,
//       host: process.env.TYPEORM_HOST || '127.0.0.1',
//       database: process.env.TYPEORM_DATABASE || 'nestjs',
//       timezone: 'Z',
//       entities: path
//         .resolve(__dirname, '..', '..', '**')
//         .concat(process.env.TYPEORM_ENTITIES)
//         .split(' '), // webpack-hmr.config이용한 hot reloading시 제대로 동작 안함
//       // entities: [Sample, SampleDetail],
//       migrations: path
//         .resolve(__dirname, '..', '..')
//         .concat(process.env.TYPEORM_MIGRATIONS_DIR)
//         .split(' '),
//       migrationsRun: true,
//       cli: { migrationsDir: 'src/migrations' },
//       synchronize: false, // nest와 DB를 싱크시켜서 DB에 테이블을 새로 생성시키기 때문에 데이터 유실이 될수 있음
//       logging: enableTypeORMLoggingOptionsPerEnvironment(),
//       keepConnectionAlive: true, // true이면 애플리케이션 종료시 연결이 닫히지 않습니다(기본값: false)
//       extra: {
//         connectionLimit: 5,
//       },
//     };
//   }
// }

const config: ConnectionOptions = {
  type: 'mysql',
  name: process.env.TYPEORM_NAME || 'default',
  username: process.env.TYPEORM_USERNAME || 'root',
  password: process.env.TYPEORM_PASSWORD || '',
  port: +process.env.TYPEORM_PORT || 3306,
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  database: process.env.TYPEORM_DATABASE || 'nestjs',
  timezone: 'Z',
  entities: path
    .resolve(__dirname, '..', '..', '**')
    .concat(process.env.TYPEORM_ENTITIES)
    .split(' '), // webpack-hmr.config이용한 hot reloading시 제대로 동작 안함
  migrations: path
    .resolve(__dirname, '..', '..')
    .concat(process.env.TYPEORM_MIGRATIONS_DIR)
    .split(' '),
  migrationsRun: true,
  synchronize: false, // nest와 DB를 싱크시켜서 DB에 테이블을 새로 생성시키기 때문에 데이터 유실이 될수 있음
  logging: enableTypeORMLoggingOptionsPerEnvironment(),
  cli: { migrationsDir: 'src/migrations' },
  extra: { connectionLimit: 5 },
};

export = config;
