import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Film } from './postgres/film.entity';
import { Schedule } from './postgres/schedule.entity';
import { FilmSchema } from './mongodb/film.schema';
import { FilmsRepository as PostgresFilmsRepository } from './postgres/films.repository';
import { FilmsRepository as MongoDBFilmsRepository } from './mongodb/films.repository';
import { configProvider, DBMSSupport } from 'src/app.config.provider';
import { isInstance } from '../utils/utils';

@Global()
@Module({})
export class FilmsRepository {
  static forRoot(): DynamicModule {
    const databaseDriver = configProvider.useValue.database.driver;
    console.log(`Try starting ${databaseDriver} repository`);
    if (!isInstance(databaseDriver, DBMSSupport))
      throw new Error(`${databaseDriver} не поддерживается!`);

    const databaseModule =
      databaseDriver === DBMSSupport.MONGODB
        ? MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])
        : TypeOrmModule.forFeature([Film, Schedule]);

    const repositoryProvider: Provider = {
      provide: 'FILMS_REPOSITORY',
      useClass:
        databaseDriver === DBMSSupport.MONGODB
          ? MongoDBFilmsRepository
          : PostgresFilmsRepository,
    };

    return {
      module: FilmsRepository,
      imports: [databaseModule],
      providers: [repositoryProvider],
      exports: [repositoryProvider],
    };
  }
}
