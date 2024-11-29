import { ConfigModule } from '@nestjs/config';

export enum DBMSSupport {
  MONGODB = 'mongodb',
  POSTGRESQL = 'postgres',
}

export enum LoggerSupport {
  dev = 'dev',
  json = 'json',
  tskv = 'tskv',
}

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      databaseName: process.env.DATABASE_NAME,
    },
    logger: process.env.logger,
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  logger: LoggerSupport;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
}
