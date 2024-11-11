import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { FilmsRepository } from './DBMS/films.repository';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrdersModule } from './orders/orders.module';
import { DBMSModule } from './DBMS/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DBMSModule.forRoot(),
    FilmsRepository.forRoot(),
    FilmsModule,
    OrdersModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '*',
      serveRoot: '/',
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
